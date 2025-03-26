import { Collapse, Divider, Text } from "@mantine/core";
import { ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import { useDeckStore } from "../../../lib/deckStore";
import { Card } from "../../../types/api";
import CardItem from "./CardItem";

const DeckView = () => {
  const deckStore = useDeckStore();
  const deck = deckStore.decks.find((deck) => deck.id === deckStore.currentDeckId);
  const [opened, setOpened] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (data) {
      const card: Card = JSON.parse(data);
      if (deck && card) {
        deckStore.addCardToDeck(deck.id, card);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col">
      <Divider />
      <div
        onClick={() => setOpened(!opened)}
        className="flex items-center justify-between px-2 py-1 hover:bg-stone-600 transform cursor-pointer transition-all"
      >
        <div>
          <Text c="dimmed" className="font-semibold text-md ">
            ACTIVE DECK
          </Text>
          <Text className="text-2xl">{deck?.name}</Text>
        </div>
        <div>
          <ChevronUpIcon
            className={`w-10 h-10 transition-all ${
              opened ? "rotate-180" : "rotate-0"
            } ease-out duration-500`}
          />
        </div>
      </div>
      <Collapse in={opened}>
        <div className="bg-stone-900 p-2 h-80 overflow-auto" onDragOver={handleDragOver} onDrop={handleDrop}>
          <Text c="dimmed" className="font-semibold">
            CARDS
          </Text>
          <div className="flex flex-col gap-1">
            {Array.from(deck?.cards.values() ?? []).map((cardInfo) => (
              <CardItem
                key={cardInfo.card.code}
                card={cardInfo.card}
                quantity={cardInfo.quantity}
              />
            ))}
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default DeckView;
