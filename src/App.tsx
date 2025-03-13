import { useQuery } from "@tanstack/react-query";
import CardDisplay from "./components/CardDisplay.tsx";
import Sidebar from "./components/Sidebar.tsx";
import { Card } from "./types/api.ts";

async function fetchCards(): Promise<Card[]> {
  const response = await fetch("https://arkhamdb.com/api/public/cards/");
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

function App() {
  const cards = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
  });

  const cardList = cards.data ?? [];

  return (
    <div className="flex h-screen w-screen bg-stone-900">
      <Sidebar cards={cardList}/>
      <CardDisplay cards={cardList} />
    </div>
  );
}

export default App;
