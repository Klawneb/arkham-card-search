import { nanoid } from "nanoid";
import superjson from "superjson";
import { persist } from "zustand/middleware";
import { create } from "zustand/react";
import { Card } from "../types/api";
import { Deck } from "../types/deck";

interface DeckStoreState {
  decks: Deck[];
  setDecks: (decks: Deck[]) => void;
  addCardToDeck: (deckId: string, card: Card) => void;
  removeCardFromDeck: (deckId: string, card: Card) => void;
  createDeck: (name: string) => void;
  currentDeckId?: string;
  setCurrentDeckId: (deckId: string) => void;
}

export const useDeckStore = create<DeckStoreState>()(
  persist(
    (set) => ({
      decks: [],
      setDecks: (decks) => set({ decks }),
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
              id: nanoid(),
              name,
              cards: new Map(),
            },
          ],
        })),
      currentDeckId: undefined,
      setCurrentDeckId: (deckId) => set({ currentDeckId: deckId }),
    }),
    {
      name: "deck-store",
      storage: {
        setItem: (key, value) => {
          localStorage.setItem(key, superjson.stringify(value));
        },
        getItem: (key) => {
          const item = localStorage.getItem(key);
          return item ? superjson.parse(item) : null;
        },
        removeItem: (key) => localStorage.removeItem(key),
      },
    }
  )
);
