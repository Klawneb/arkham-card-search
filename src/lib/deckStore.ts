import { create } from "zustand/react";
import { persist } from "zustand/middleware";
import { Deck } from "../types/deck";

interface DeckStoreState {
  decks: Deck[];
  setDecks: (decks: Deck[]) => void;
  currentDeck: Deck | null;
  setCurrentDeck: (deck: Deck | null) => void;
}

export const useDeckStore = create<DeckStoreState>()(
  persist(
    (set) => ({
      decks: [],
      setDecks: (decks) => set({ decks }),
      currentDeck: null,
      setCurrentDeck: (deck) => set({ currentDeck: deck }),
    }),
    {
      name: "deck-store", // key used in localStorage
      partialize: (state) => ({ decks: state.decks }), // persist only decks
    }
  )
);
