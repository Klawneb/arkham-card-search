import { Card } from "../types/api";
import { useState } from "react";
import { filterCards, useFilterStore } from "../lib/filter.ts";
import { useDisclosure } from "@mantine/hooks";
import CardModal from "./CardModal.tsx";
import CardGrid from "./CardGrid.tsx";
import { useSettingsStore } from "../lib/settings.ts";

interface CardDisplayProps {
  cards: Card[];
}

function getCardWidth(settingsSize: number) {
  switch (settingsSize) {
    case 0:
      return 100;
    case 25:
      return 150;
    case 50:
      return 200;
    case 75:
      return 250;
    case 100:
      return 350;
    default:
      return 200;
  }
}

const CardDisplay = ({ cards }: CardDisplayProps) => {
  const [opened, handlers] = useDisclosure(false);
  const [modalCard, setModalCard] = useState<Card | null>(null);
  const filterStore = useFilterStore();
  const settingsStore = useSettingsStore();

  const cardWidth = getCardWidth(settingsStore.cardSize);

  if (cards.length === 0) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const filteredCards = filterCards(cards, filterStore);

  return (
    <div className="flex-grow">
      <CardGrid
        cardHeight={cardWidth * 1.4}
        cardWidth={cardWidth}
        cards={filteredCards}
        openModal={handlers.open}
        setModalCard={setModalCard}
      />
      <CardModal
        opened={opened}
        onClose={handlers.close}
        card={modalCard}
        setModalCard={setModalCard}
        cards={filteredCards}
      />
    </div>
  );
};

export default CardDisplay;
