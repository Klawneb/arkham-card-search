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
    if (text === "") {
        return cards;
    }

    const results = fuzzysort.go(text, cards, {
        keys: ["name"]
    })
    return results.map(key => key.obj);
}

export function filterCards(cards: Card[], filter: FilterState): Card[] {
    return textFilter(cards, filter.textFilter);
}
