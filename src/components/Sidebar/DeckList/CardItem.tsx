import { ActionIcon, Text } from "@mantine/core";
import { Minus, Plus } from "lucide-react";
import { useDeckStore } from "../../../lib/deckStore";
import { Card } from "../../../types/api";

interface CardItemProps {
  card: Card;
  quantity: number;
}

const CardItem = ({ card, quantity }: CardItemProps) => {
  const currentDeckId = useDeckStore((state) => state.currentDeckId);
  const addCardToDeck = useDeckStore((state) => state.addCardToDeck);
  const removeCardFromDeck = useDeckStore((state) => state.removeCardFromDeck);

  const isMyriad = card.text?.toLowerCase().includes("myriad");

  return (
    <div className="flex gap-2 items-center bg-stone-800 rounded-md p-0">
      <ActionIcon
        size={"xs"}
        color="red"
        onClick={() => currentDeckId && removeCardFromDeck(currentDeckId, card)}
      >
        <Minus size={16} />
      </ActionIcon>
      <Text>{quantity}x</Text>
      <div className="w-6 flex items-center">
        {quantity < (isMyriad ? 3 : 2) ? (
          <ActionIcon
            size={"xs"}
            onClick={() => currentDeckId && addCardToDeck(currentDeckId, card)}
          >
            <Plus size={16} />
          </ActionIcon>
        ) : null}
      </div>
      <Text className="ml-2">{card.name}</Text>
    </div>
  );
};

export default CardItem;
