import { useQuery } from "@tanstack/react-query";
import CardDisplay from "./components/CardDisplay.tsx";
import Sidebar from "./components/Sidebar.tsx";
import { Card } from "./types/api.ts";
import { createContext } from "react";

async function fetchCards(): Promise<Card[]> {
  const response = await fetch("https://arkhamdb.com/api/public/cards/");
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export const CardContext = createContext<Card[]>([]);

function App() {
  const cards = useQuery({
    queryKey: ["cards"],
    queryFn: fetchCards,
  });

  const cardList = cards.data ?? [];

  return (
    <div className={`flex h-screen w-screen bg-stone-900`}>
      <CardContext.Provider value={cardList}>
        <Sidebar />
        <CardDisplay />
      </CardContext.Provider>
    </div>
  );
}

export default App;
