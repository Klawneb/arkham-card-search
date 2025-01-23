import {useQuery} from "@tanstack/react-query";
import {Card} from "../types/api";

async function fetchCards(): Promise<Card[]> {
    const response = await fetch("https://arkhamdb.com/api/public/cards/");
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
}

export default function CardDisplay() {
    const cards = useQuery({
        queryKey: ['cards'],
        queryFn: fetchCards
    })

    if (cards.isFetching) {
        return <p>Loading...</p>
    }

    return <div>
        {
            cards.data?.map((card) => (
                <p>{card.name}</p>
            ))
        }
    </div>
}