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
        filter.factionFilter.some((faction) => card.faction_code.includes(faction))
    );
}

export function filterCards(cards: Card[], filter: FilterState): Card[] {
    const filters = [textFilter, factionFilter];

    return filters.reduce((filteredCards, filterFn) => {
        return filterFn(filteredCards, filter);
    }, cards);
}
