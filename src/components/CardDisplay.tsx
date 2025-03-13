import { Card } from "../types/api";
import { useState } from "react";
import { filterCards, useFilterStore } from "../lib/filter.ts";
import { useDisclosure } from "@mantine/hooks";
import CardModal from "./CardModal.tsx";
import CardGrid from "./CardGrid.tsx";

interface CardDisplayProps {
  cards: Card[];
}

const CardDisplay = ({ cards }: CardDisplayProps) => {
  const [opened, handlers] = useDisclosure(false);
  const [modalCard, setModalCard] = useState<Card | null>(null);
  const filterStore = useFilterStore();

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
        cardHeight={280}
        cardWidth={200}
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
