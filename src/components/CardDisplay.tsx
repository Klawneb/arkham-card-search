import {useQuery} from "@tanstack/react-query";
import {Card} from "../types/api";
import {CardItem} from "./CardItem.tsx";

async function fetchCards(): Promise<Card[]> {
    const response = await fetch("https://arkhamdb.com/api/public/cards/");
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export default function CardDisplay() {
    const cards = useQuery({
        queryKey: ["cards"],
        queryFn: fetchCards,
    });

    return (
        <div className="grid grid-cols-[repeat(auto-fit,300px)] auto-rows-[420px] gap-4 justify-center">
            {cards.data?.slice(0, 12).map((card, i) => (
                <CardItem key={i} card={card}/>
            ))}
        </div>
    );
}