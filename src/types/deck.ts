import { Card } from "./api";

export interface Deck {
  cards: Card[];
  id: string;
  name: string;
  investigator?: Card;
}