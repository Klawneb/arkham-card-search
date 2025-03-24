import { Text } from "@mantine/core";
import { Card } from "../../../types/api";

interface CardItemProps {
  card: Card;
}

const CardItem = ({ card }: CardItemProps) => {
  return (
    <div>
      <Text>{card.name}</Text>
    </div>
  );
};

export default CardItem;
