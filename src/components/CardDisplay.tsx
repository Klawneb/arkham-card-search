import { useQuery } from "@tanstack/react-query";
import { Card } from "../types/api";
import CardItem from "./CardItem.tsx";
import { VirtuosoGrid } from "react-virtuoso";
import { useState } from "react";
import { filterCards, useFilterStore } from "../lib/filter.ts";

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
                        />
                    );
                }}
                overscan={1000}
                listClassName="grid grid-cols-[repeat(auto-fit,minmax(var(--min-col-width),1fr))] gap-2 h-full"
            />
        </div>
    );
};

export default CardDisplay;
