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

    return <div className="grid grid-cols-[repeat(auto-fit,300px)] auto-rows-[420px] gap-4 justify-center">
        {cards.data?.map((card, i) => (
            <div
                key={i}
                className="bg-zinc-500 text-white w-[300px] h-[420px] rounded-xl shadow flex items-center justify-center text-center overflow-hidden"
            >
                <img loading={"lazy"} src={`https://arkhamdb.com${card.imagesrc}`} className="h-full w-full object-cover object-left"/>
            </div>
        ))}
    </div>
}