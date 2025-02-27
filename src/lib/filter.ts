import { Card, Faction, Type } from "../types/api";
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
    resourceFilter: [number, number];
    setResourceFilter: (resourceCost: [number, number]) => void;
    typeFilter: Type[];
    setTypeFilter: (types: Type[]) => void;
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
    resourceFilter: [-2, 12],
    setResourceFilter: (resourceCost) => set({ resourceFilter: resourceCost }),
    typeFilter: [],
    setTypeFilter: (types) => set({ typeFilter: types }),
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

        const xpCost = card.exceptional
            ? card.xp * 2
            : card.xp;

        return xpCost >= filter.xpFilter[0] && xpCost <= filter.xpFilter[1];
    });
}

function resourceFilter(cards: Card[], filter: FilterState) {
    return cards.filter((card) => {
        if (filter.resourceFilter[0] === -2 && filter.resourceFilter[1] === 12) {
            return true;
        }

        if (!card.hasOwnProperty("cost") || card.cost === undefined) {
            return false;
        }

        return (
            card.cost >= filter.resourceFilter[0] && card.cost <= filter.resourceFilter[1]
        );
    });
}

function typeFilter(cards: Card[], filter: FilterState) {
    return cards.filter((card) => {
        if (filter.typeFilter.length === 0) {
            return true;
        }

        return filter.typeFilter.includes(card.type_code);
    })
}

export function filterCards(cards: Card[], filter: FilterState): Card[] {
    const filters = [textFilter, factionFilter, xpFilter, resourceFilter, typeFilter];

    return filters.reduce((filteredCards, filterFn) => {
        return filterFn(filteredCards, filter);
    }, cards);
}
