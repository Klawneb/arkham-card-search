import { Card, Faction } from "../types/api";
import * as fuzzysort from "fuzzysort";
import { create } from "zustand/react";

interface FilterState {
    textFilter: string;
    setTextFilter: (text: string) => void;
    filterTitlesOnly: boolean;
    setFilterTitlesOnly: (titlesOnly: boolean) => void;
    showAllResults: boolean;
    setShowAllResults: (showAllResults: boolean) => void;
    factionFilter: Faction[];
    setFactionFilter: (factions: Faction[]) => void;
    xpFilter: [number, number];
    setxpFilter: (xpCost: [number, number]) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    textFilter: "",
    setTextFilter: (text) => set({ textFilter: text }),
    filterTitlesOnly: false,
    setFilterTitlesOnly: (titlesOnly) => set({ filterTitlesOnly: titlesOnly }),
    showAllResults: false,
    setShowAllResults: (showAllResults) =>
        set({ showAllResults: showAllResults }),
    factionFilter: [],
    setFactionFilter: (factions) => set({ factionFilter: factions }),
    xpFilter: [0, 10],
    setxpFilter: (xpCost) => set({ xpFilter: xpCost }),
}));

function textFilter(cards: Card[], filter: FilterState) {
    const results = fuzzysort.go(filter.textFilter, cards, {
        keys: filter.filterTitlesOnly ? ["name"] : ["name", "text"],
        all: true,
        threshold: filter.showAllResults ? 0 : 0.5,
    });
    return results
        .map((key) => key)
        .sort((a, b) => b.score - a.score)
        .map((key) => key.obj);
}

function factionFilter(cards: Card[], filter: FilterState) {
    if (filter.factionFilter.length === 0) {
        return cards;
    }

    return cards.filter((card) =>
        filter.factionFilter.some((faction) =>
            card.faction_code.includes(faction)
        )
    );
}

function xpFilter(cards: Card[], filter: FilterState) {
    return cards.filter((card) => {
        if (filter.xpFilter[0] === 0 && filter.xpFilter[1] === 10) {
            return true;
        }

        if (!card.hasOwnProperty("xp") || card.xp === undefined) {
            return false;
        }

        const xpCost = card.text?.includes("Exceptional.")
            ? card.xp * 2
            : card.xp;

        return xpCost >= filter.xpFilter[0] && xpCost <= filter.xpFilter[1];
    });
}

export function filterCards(cards: Card[], filter: FilterState): Card[] {
    const filters = [textFilter, factionFilter, xpFilter];

    return filters.reduce((filteredCards, filterFn) => {
        return filterFn(filteredCards, filter);
    }, cards);
}
