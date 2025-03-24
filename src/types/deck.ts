import { Card } from "./api";

export interface Deck {
  cards: Map<string, { card: Card; quantity: number }>;
  id: string;
  name: string;
  investigator?: Card;
}
