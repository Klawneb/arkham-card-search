import { useVirtualizer } from "@tanstack/react-virtual";
import { Card } from "../types/api";
import CardItem from "./CardItem";
import { useElementSize } from "@mantine/hooks";
import { useRef } from "react";

interface CardGridProps {
  cards: Card[];
  cardHeight: number;
  cardWidth: number;
  setModalCard: (card: Card) => void;
  openModal: () => void;
}

function CardGrid({ cards, cardHeight, cardWidth, setModalCard, openModal }: CardGridProps) {
  const parentRef = useRef(null);
  const { ref, width } = useElementSize();

  const cardsPerRow = Math.max(1, Math.floor(width / cardWidth));
  const emptySpace = width - cardWidth * cardsPerRow;
  const cardMarginX = Math.max(emptySpace / cardsPerRow / 2, 4);
  const cardMarginY = 12;

  const rowVirtualizer = useVirtualizer({
    count: width > 0 ? Math.ceil(cards.length / cardsPerRow) : 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => cardHeight + cardMarginY,
    overscan: 1,
  });

  return (
    <div ref={ref} className="w-full h-full p-2">
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
              <div className="flex justify-start">
                {cards
                  .slice(
                    virtualRow.index * cardsPerRow,
                    virtualRow.index * cardsPerRow + cardsPerRow
                  )
                  .map((card) => {
                    return (
                      <div key={card.code} style={{ margin: `0px ${cardMarginX}px` }}>
                        <CardItem
                          card={card}
                          height={cardHeight}
                          width={cardWidth}
                          setModalCard={setModalCard}
                          openModal={openModal}
                        />
                      </div>
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
