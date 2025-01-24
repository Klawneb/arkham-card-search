import {useQuery} from "@tanstack/react-query";
import {Card} from "../types/api";
import {CardItem} from "./CardItem.tsx";
import {useEffect, useState} from "react";

async function fetchCards(): Promise<Card[]> {
    const response = await fetch("https://arkhamdb.com/api/public/cards/");
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export default function CardDisplay() {
    const [flippedStates, setFlippedStates] = useState<boolean[]>([]);
    const cards = useQuery({
        queryKey: ["cards"],
        queryFn: fetchCards,
    });

    useEffect(() => {
        if (cards.data && cards.isSuccess) {
            setFlippedStates(new Array(cards.data.length).fill(false));

            // Sequentially flip cards after data is fetched
            cards.data.forEach((_card, index) => {
                setTimeout(() => {
                    setFlippedStates((prev) => {
                        const newStates = [...prev];
                        newStates[index] = true;
                        return newStates;
                    });
                }, (index + 1) * 200);
            });
        }
    }, [cards.isFetching, cards.data, cards.isSuccess]);

    return (
        <div className="grid grid-cols-[repeat(auto-fit,300px)] auto-rows-[420px] gap-4 justify-center">
            {cards.data?.slice(0, 12).map((card, i) => (
                <CardItem key={i} card={card} flipped={flippedStates[i]} />
            ))}
        </div>
    );
}