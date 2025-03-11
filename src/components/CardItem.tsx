import { AspectRatio, Image } from "@mantine/core";
import { Card } from "../types/api";
import { AnimatePresence, motion } from "framer-motion";

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
    <div className="flex justify-center cursor-pointer" onClick={handleClick}>
      <Image
        src={`https://arkhamdb.com${card.imagesrc}`}
        className="h-full object-cover object-left"
        alt={`${card.name} card art`}
        fallbackSrc="https://hallofarkham.com/wp-content/uploads/2020/07/arkham2.png"
        w={width}
        h={height}
      />
    </div>
  );
};

export default CardItem;
