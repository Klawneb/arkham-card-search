import { Collapse, Divider, Text } from "@mantine/core";
import { useDeckStore } from "../../../lib/deckStore";
import { useState } from "react";
import { ChevronUpIcon } from "lucide-react";
import { Card } from "../../../types/api";

const DeckView = () => {
  const deckStore = useDeckStore();
  const deck = deckStore.currentDeck;
  const [opened, setOpened] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (data) {
      const cardData: Card = JSON.parse(data);
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
        <div className="bg-stone-900 p-2 h-40" onDragOver={handleDragOver} onDrop={handleDrop}>
          <Text c="dimmed" className="font-semibold">
            CARDS
          </Text>
        </div>
      </Collapse>
    </div>
  );
};

export default DeckView;
