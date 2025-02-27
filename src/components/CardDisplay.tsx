import { useQuery } from "@tanstack/react-query";
import { Card } from "../types/api";
import CardItem from "./CardItem.tsx";
import { VirtuosoGrid } from "react-virtuoso";
import { useState } from "react";
import { filterCards, useFilterStore } from "../lib/filter.ts";
import { useDisclosure } from "@mantine/hooks";
import CardModal from "./CardModal.tsx";

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
  const [columnMinWidth] = useState(200);
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
    <div
      className="flex-grow p-2 overflow-auto"
      style={
        {
          "--min-col-width": `${columnMinWidth}px`,
        } as React.CSSProperties
      }
    >
      <VirtuosoGrid
        totalCount={filteredCards.length}
        itemContent={(index) => {
          const card = filteredCards[index];
          return (
            <CardItem
              card={card}
              key={card.octgn_id}
              width={columnMinWidth}
              openModal={handlers.open}
              setModalCard={setModalCard}
            />
          );
        }}
        listClassName="grid grid-cols-[repeat(auto-fit,minmax(var(--min-col-width),1fr))] gap-2 h-full"
      />
      <CardModal opened={opened} onClose={handlers.close} card={modalCard} />
    </div>
  );
};

export default CardDisplay;
