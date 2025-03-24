import { Image } from "@mantine/core";
import { Card } from "../types/api";

interface CardItemProps {
  card: Card;
  openModal: () => void;
  setModalCard: (card: Card) => void;
  width: number;
  height: number;
}

const CardItem = ({ card, openModal, setModalCard, width, height }: CardItemProps) => {
  function handleClick() {
    setModalCard(card);
    openModal();
  }

  return (
    <div
      className="flex justify-center cursor-pointer"
      onClick={handleClick}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("application/json", JSON.stringify(card));
        e.dataTransfer.setDragImage(e.currentTarget, width / 2, height / 2);
      }}
    >
      <Image
        src={`https://arkhamdb.com${card.imagesrc}`}
        className="h-full object-cover object-left rounded-lg"
        alt={`${card.name} card art`}
        fallbackSrc="https://hallofarkham.com/wp-content/uploads/2020/07/arkham2.png"
        w={width}
        h={height}
      />
    </div>
  );
};

export default CardItem;
