import { useRef, useState, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Card } from "../types/api";
import React from "react";
import CardItem from "./CardItem";
import { useElementSize } from "@mantine/hooks";

interface CardGridProps {
  cards: Card[];
  cardHeight: number;
  cardWidth: number;
  setModalCard: (card: Card) => void;
  openModal: () => void;
}

function CardGrid({ cards, cardHeight, cardWidth, setModalCard, openModal }: CardGridProps) {
  const parentRef = React.useRef(null);
  const { ref, width } = useElementSize();

  const cardsPerRow = Math.floor(width / cardWidth);

  const rowVirtualizer = useVirtualizer({
    count: width > 0 ? cards.length / cardsPerRow : 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => cardHeight,
    overscan: 1,
  });

  return (
    <div ref={ref} className="w-full h-full">
      <div ref={parentRef} className="w-full h-full overflow-auto">
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="m-2 h-full flex justify-between">
                {cards
                  .slice(
                    virtualRow.index * cardsPerRow,
                    virtualRow.index * cardsPerRow + cardsPerRow
                  )
                  .map((card) => {
                    return (
                      <CardItem
                        card={card}
                        height={cardHeight}
                        width={cardWidth}
                        key={card.code}
                        setModalCard={setModalCard}
                        openModal={openModal}
                      />
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardGrid;
