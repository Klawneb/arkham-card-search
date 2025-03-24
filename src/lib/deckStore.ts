import { create } from "zustand/react";
import { persist } from "zustand/middleware";
import { Deck } from "../types/deck";
import { Card } from "../types/api";

interface DeckStoreState {
  decks: Deck[];
  setDecks: (decks: Deck[]) => void;
  currentDeck: Deck | null;
  setCurrentDeck: (deck: Deck | null) => void;
  addCardToDeck: (deckId: string, card: Card) => void;
  removeCardFromDeck: (deckId: string, card: Card) => void;
  createDeck: (name: string) => void;
}

export const useDeckStore = create<DeckStoreState>()(
  persist(
    (set) => ({
      decks: [],
      setDecks: (decks) => set({ decks }),
      currentDeck: null,
      setCurrentDeck: (deck) => set({ currentDeck: deck }),
      addCardToDeck: (deckId, card) =>
        set((state) => ({
          decks: state.decks.map((deck) => {
            if (deck.id === deckId) {
              const newCards = new Map(deck.cards);
              const cardKey = card.code;
              if (newCards.has(cardKey)) {
                const existingEntry = newCards.get(cardKey)!;
                newCards.set(cardKey, {
                  card: existingEntry.card,
                  quantity: existingEntry.quantity + 1,
                });
              } else {
                newCards.set(cardKey, { card, quantity: 1 });
              }
              return { ...deck, cards: newCards };
            }
            return deck;
          }),
        })),
      removeCardFromDeck: (deckId, card) =>
        set((state) => ({
          decks: state.decks.map((deck) => {
            if (deck.id === deckId) {
              const newCards = new Map(deck.cards);
              const cardKey = card.code;
              if (newCards.has(cardKey)) {
                const existingEntry = newCards.get(cardKey)!;
                if (existingEntry.quantity > 1) {
                  newCards.set(cardKey, {
                    card: existingEntry.card,
                    quantity: existingEntry.quantity - 1,
                  });
                } else {
                  newCards.delete(cardKey);
                }
              }
              return { ...deck, cards: newCards };
            }
            return deck;
          }),
        })),
      createDeck: (name: string) =>
        set((state) => ({
          decks: [
            ...state.decks,
            {
              id: Date.now().toString(),
              name,
              cards: new Map(),
            },
          ],
        })),
    }),
    {
      name: "deck-store",
      partialize: (state) => ({ decks: state.decks }),
    }
  )
);
