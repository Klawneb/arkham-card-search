import {Card} from "../types/api";
import * as fuzzysort from "fuzzysort";
import {create} from "zustand/react";

interface FilterState {
    textFilter: string,
    setTextFilter: (text: string) => void,
    filterTitlesOnly: boolean,
    setFilterTitlesOnly: (titlesOnly: boolean) => void,
    showAllResults: boolean,
    setShowAllResults: (showAllResults: boolean) => void
}

export const useFilterStore = create<FilterState>((set) => ({
    textFilter: "",
    setTextFilter: (text) => set({ textFilter:  text }),
    filterTitlesOnly: false,
    setFilterTitlesOnly: (titlesOnly) => set({ filterTitlesOnly: titlesOnly }),
    showAllResults: false,
    setShowAllResults: (showAllResults) => set({ showAllResults: showAllResults })
}))

function textFilter(cards: Card[], filter: FilterState) {
    const results = fuzzysort.go(filter.textFilter, cards, {
        keys: filter.filterTitlesOnly ? ["name"] : ["name", "text"],
        all: true,
        threshold: filter.showAllResults ? 0 : .5
    })
    return results.map(key => key).sort((a, b) => b.score - a.score).map(key => key.obj);
}

export function filterCards(cards: Card[], filter: FilterState): Card[] {
    return textFilter(cards, filter);
}
