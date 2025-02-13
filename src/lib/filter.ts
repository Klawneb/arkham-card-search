import {Card} from "../types/api";
import * as fuzzysort from "fuzzysort";
import {create} from "zustand/react";

interface FilterState {
    textFilter: string,
    setTextFilter: (text: string) => void,
}

export const useFilterStore = create<FilterState>((set) => ({
    textFilter: "",
    setTextFilter: (text) => set({ textFilter:  text })
}))

function textFilter(cards: Card[], text: string) {
    const results = fuzzysort.go(text, cards, {
        keys: ["name"],
        all: true,
    })
    return results.map(key => key.obj).sort((a, b) => a.code.localeCompare(b.code));
}

export function filterCards(cards: Card[], filter: FilterState): Card[] {
    return textFilter(cards, filter.textFilter);
}
