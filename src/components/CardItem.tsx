import { AspectRatio, Image } from "@mantine/core";
import { Card } from "../types/api";
import { AnimatePresence, motion } from "framer-motion";

interface CardItemProps {
  card: Card;
  openModal: () => void;
  setModalCard: (card: Card) => void;
}

const CardItem = ({ card, openModal, setModalCard }: CardItemProps) => {
  function handleClick() {
    setModalCard(card);
    openModal();
  }

  return (
    <AnimatePresence>
      <div className="flex justify-center cursor-pointer" onClick={handleClick}>
        <AspectRatio ratio={5 / 7} className="rounded-md overflow-hidden">
          {card.imagesrc ? null : (
            <div className="absolute flex flex-col justify-center items-center">
              {card.name.split(" ").map((word, index) => (
                <p
                  key={index}
                  className="font-black text-white select-none text-4xl"
                  style={{ mixBlendMode: "exclusion" }}
                >
                  {word}
                </p>
              ))}
            </div>
          )}
          <Image
            src={`https://arkhamdb.com${card.imagesrc}`}
            className="h-full object-cover object-left"
            alt={`${card.name} card art`}
            fallbackSrc="https://hallofarkham.com/wp-content/uploads/2020/07/arkham2.png"
          />
        </AspectRatio>
      </div>
    </AnimatePresence>
  );
};

export default CardItem;
