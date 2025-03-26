import { Text } from "@mantine/core";
import { Card } from "../../../types/api";

interface CardItemProps {
  card: Card;
  quantity: number;
}

const CardItem = ({ card, quantity }: CardItemProps) => {
  return (
    <div className="flex gap-2">
      <Text>{quantity}x</Text>
      <Text>{card.name}</Text>
    </div>
  );
};

export default CardItem;
