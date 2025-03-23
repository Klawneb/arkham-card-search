import { useDeckStore } from "../../lib/deckStore";

const DeckView = () => {
  const deckStore = useDeckStore();
  const deck = deckStore.currentDeck;

  return <div>
    {
      
    }
  </div>;
};

export default DeckView;
