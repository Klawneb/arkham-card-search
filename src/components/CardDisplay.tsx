import {useQuery} from "@tanstack/react-query";
import {Card} from "../types/api";
import CardItem from "./CardItem.tsx";
import {motion} from "motion/react";

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

    return (
        <motion.div
            className="grid grid-cols-[repeat(auto-fit,200px)] auto-rows-[280px] gap-4 justify-center">
            {cards.data?.slice(0, 12).map((card, i) => (
                <CardItem key={i} card={card}/>
            ))}
        </motion.div>
    );
}

export default CardDisplay