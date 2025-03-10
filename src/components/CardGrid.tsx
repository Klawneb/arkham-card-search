import { useRef, useState, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Card } from "../types/api";

type CardGridProps = {
  items: Card[];
  cardWidth: number;
  cardHeight: number;
  gap?: number;
  minGap?: number;
};

export default function CardGrid({ items, cardWidth, cardHeight, gap = 8, minGap = 8 }: CardGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(1);
  const [adjustedGap, setAdjustedGap] = useState(gap);

  useEffect(() => {
    const updateLayout = () => {
      if (parentRef.current) {
        const containerWidth = parentRef.current.clientWidth;
        const maxColumns = Math.max(1, Math.floor((containerWidth + minGap) / (cardWidth + minGap)));
        const totalCardWidth = maxColumns * cardWidth;
        const remainingSpace = containerWidth - totalCardWidth;
        let newGap = maxColumns > 1 ? remainingSpace / (maxColumns - 1) : minGap;
        
        newGap = Math.max(newGap, minGap);

        setColumnCount(maxColumns);
        setAdjustedGap(newGap);
      }
    };
    
    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [cardWidth, gap, minGap]);

  const rowCount = Math.ceil(items.length / columnCount);

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => cardHeight + minGap, // Ensuring a consistent row height
  });

  return (
    <div ref={parentRef} className="w-full h-full overflow-auto">
      <div
        style={{ height: rowVirtualizer.getTotalSize(), position: "relative" }}
        className="w-full"
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const startIndex = virtualRow.index * columnCount;
          const rowItems = items.slice(startIndex, startIndex + columnCount);

          return (
            <div
              key={virtualRow.key}
              className="absolute flex justify-center"
              style={{
                top: virtualRow.start,
                left: 0,
                width: "100%",
                height: cardHeight,
                display: "flex",
                gap: `${adjustedGap}px`,
                marginBottom: `${adjustedGap}px`,
              }}
            >
              {rowItems.map((item) => (
                <div
                  key={item.code}
                  className="bg-gray-800 text-white p-4 rounded-lg shadow-md"
                  style={{ width: cardWidth, height: cardHeight }}
                >
                  {item.name}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
