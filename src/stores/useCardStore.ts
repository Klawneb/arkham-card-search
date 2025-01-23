import { create } from "zustand";
import {Card} from "../types/api";

interface CardStore {
    cards: Card[],
}

const useCardStore = create<CardStore>()((set) => ({
    cards: [],
    setCards: (cards: Card[]) => set({cards: cards}),
}));