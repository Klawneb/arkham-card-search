import { useQuery } from "@tanstack/react-query";
import { Card } from "../types/api";
import CardItem from "./CardItem.tsx";
import { VirtuosoGrid } from "react-virtuoso";
import { useEffect, useState } from "react";
import { Slider } from "@mantine/core";

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
    const [columnMinWidth, setColumnMinWidth] = useState(200);

    if (!cards.data) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

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
                totalCount={cards.data.length}
                itemContent={(index) => {
                    const card = cards.data[index];
                    return (
                        <CardItem
                            card={card}
                            key={card.octgn_id}
                            width={columnMinWidth}
                        />
                    );
                }}
                listClassName="grid grid-cols-[repeat(auto-fit,minmax(var(--min-col-width),1fr))] gap-2"
                style={{ height: "100%" }}
                overscan={2000}
            />
        </div>
    );
};

export default CardDisplay;
