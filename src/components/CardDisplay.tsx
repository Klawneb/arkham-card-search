import { useQuery } from "@tanstack/react-query";
import { Card } from "../types/api";
import { useState } from "react";
import { filterCards, useFilterStore } from "../lib/filter.ts";
import { useDisclosure } from "@mantine/hooks";
import CardModal from "./CardModal.tsx";
import CardGrid from "./CardGrid.tsx";
import CardItem from "./CardItem.tsx";

async function fetchCards(): Promise<Card[]> {
  const response = await fetch("https://arkhamdb.com/api/public/cards/");
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

const CardDisplay = () => {
  const cards = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
  });
  const [opened, handlers] = useDisclosure(false);
  const [modalCard, setModalCard] = useState<Card | null>(null);
  const filterStore = useFilterStore();

  if (!cards.data) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  const filteredCards = filterCards(cards.data, filterStore);

  return (
    <div className="flex-grow flex">
      <CardGrid items={filteredCards} cardHeight={280} cardWidth={200}/>
      <CardModal
        opened={opened}
        onClose={handlers.close}
        card={modalCard}
        setModalCard={setModalCard}
        cards={cards.data}
      />
    </div>
  );
};

export default CardDisplay;
