import { MantineTransition, Modal, Image, AspectRatio, Overlay } from "@mantine/core";
import { Card, TypeName } from "../types/api";
import parseHTML from "html-react-parser";
import { parseCardText } from "../lib/parsers";
import { useHotkeys } from "@mantine/hooks";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlowingEdgeDiv from "./GlowingEdgeDiv";

interface CardModalProps {
  opened: boolean;
  onClose: () => void;
  card: Card | null;
  setModalCard: (card: Card) => void;
  cards: Card[];
}

const enterTransition: MantineTransition = {
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 0 },
  transitionProperty: "opacity, scale",
};

const carouselVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const carouselTransition = {
  duration: 0.2,
  ease: "circInOut",
};

function onBackgroundClicked(e: React.MouseEvent<HTMLDivElement>, closeFunction: () => void) {
  if (e.target === e.currentTarget) {
    closeFunction();
  }
}

const CardModal = ({ onClose, opened, card, setModalCard, cards }: CardModalProps) => {
  const [direction, setDirection] = useState(0);
  const currentCardIndex = cards.findIndex((c) => c.code === card?.code) % cards.length;

  useHotkeys([
    [
      "ArrowRight",
      () => {
        moveRight();
      },
    ],
    [
      "ArrowLeft",
      () => {
        moveLeft();
      },
    ],
  ]);

  function moveRight() {
    setDirection(1);
    setModalCard(cards[(currentCardIndex + 1) % cards.length]);
  }

  function moveLeft() {
    setDirection(-1);
    setModalCard(cards[(currentCardIndex - 1 + cards.length) % cards.length]);
  }

  return (
    <Modal.Root
      opened={opened}
      onClose={onClose}
      closeOnClickOutside={true}
      centered
      size={"auto"}
      className="container"
      transitionProps={{ transition: enterTransition }}
      classNames={{
        content: "bg-transparent",
      }}
    >
      <Modal.Overlay backgroundOpacity={0.9} blur={5}>
        <GlowingEdgeDiv leftOnClick={moveLeft} rightOnClick={moveRight} />
        <div className="opacity-50 absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
          <p>Use the arrow keys to navigate</p>
        </div>
      </Modal.Overlay>
      <Modal.Content>
        <Modal.Body>
          <div className={`overflow-hidden`}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={cards[currentCardIndex]?.code}
                custom={direction}
                variants={carouselVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={carouselTransition}
              >
                <div className="grid grid-cols-[500px,auto,500px] h-[50vh]">
                  <div onClick={(e) => onBackgroundClicked(e, onClose)}></div>
                  <AspectRatio ratio={card?.type_name === TypeName.Investigator ? 7 / 5 : 5 / 7}>
                    <Image
                      src={`https://arkhamdb.com${card?.imagesrc}`}
                      alt={`${card?.name} card art`}
                      className="h-full object-contain"
                      fallbackSrc="https://hallofarkham.com/wp-content/uploads/2020/07/arkham2.png"
                    />
                  </AspectRatio>
                  <div
                    className="flex flex-col justify-between p-10 overflow-auto"
                    onClick={(e) => onBackgroundClicked(e, onClose)}
                  >
                    <div>
                      <h2 className="text-center text-5xl">{card?.name}</h2>
                      <p className="text-center font-bold text-2xl">{card?.type_name}</p>
                    </div>
                    <div>
                      <p className="text-center text-2xl font-bold">{card?.traits}</p>
                      <p className="text-center text-2xl pt-8">
                        {card?.text ? parseHTML(parseCardText(card.text)) : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-center italic">{card?.flavor}</p>
                      <p className="text-center font-bold">{card?.pack_name}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default CardModal;
