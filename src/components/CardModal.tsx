import { AspectRatio, Image, Modal, Text } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import parseHTML from "html-react-parser";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { parseCardText } from "../lib/parsers";
import { Card, Type } from "../types/api";
import FlipCard from "./FlipCard";

interface CardModalProps {
  opened: boolean;
  onClose: () => void;
  card: Card | null;
  setModalCard: (card: Card) => void;
  cards: Card[];
}

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
  const [showBackText, setShowBackText] = useState(false);

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

  useEffect(() => {
    setShowBackText(false);
  }, [card]);

  function moveRight() {
    setDirection(1);
    setModalCard(cards[(currentCardIndex + 1) % cards.length]);
  }

  function moveLeft() {
    setDirection(-1);
    setModalCard(cards[(currentCardIndex - 1 + cards.length) % cards.length]);
  }

  const isInvestigator = card?.type_code === Type.Investigator;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      fullScreen
      withCloseButton={false}
      overlayProps={{ blur: 5, backgroundOpacity: 0.9 }}
      classNames={{ body: "h-full p-0", content: "bg-transparent" }}
      className="text-stone-300"
      transitionProps={{ transition: "fade" }}
    >
      <p className="italic opacity-40 bottom-5 w-full text-center absolute">
        Use the arrow keys to change cards
      </p>
      <div className=" h-full flex overflow-hidden">
        <HoverGradient direction="right" className="w-40 cursor-pointer" onClick={moveLeft} />
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={card?.code}
            custom={direction}
            variants={carouselVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={carouselTransition}
            className="flex-grow flex justify-center"
          >
            <div className="flex-1 px-10" onClick={(e) => onBackgroundClicked(e, onClose)}></div>
            <div
              className="flex flex-col justify-center items-center h-full"
              onClick={(e) => onBackgroundClicked(e, onClose)}
            >
              <AspectRatio ratio={isInvestigator ? 7 / 5 : 5 / 7} w={isInvestigator ? 800 : 500}>
                {isInvestigator ? (
                  <FlipCard
                    backImage={`https://arkhamdb.com${card?.backimagesrc}`}
                    frontImage={`https://arkhamdb.com${card?.imagesrc}`}
                    onFlip={() => setShowBackText(!showBackText)}
                  />
                ) : (
                  <Image
                    src={`https://arkhamdb.com${card?.imagesrc}`}
                    alt={`${card?.name} card art`}
                    className="object-contain rounded-3xl"
                    fallbackSrc="https://hallofarkham.com/wp-content/uploads/2020/07/arkham2.png"
                  />
                )}
              </AspectRatio>
            </div>
            <div
              className="flex-1 flex flex-col justify-center px-10"
              onClick={(e) => onBackgroundClicked(e, onClose)}
            >
              <div>
                <Text className="text-center text-5xl">{card?.name}</Text>
                <Text className="text-center font-bold text-2xl pt-5">{card?.type_name}</Text>
              </div>
              {card?.back_text ? (
                showBackText ? (
                  <div className="pt-20">
                    <Text className="text-center text-2xl pt-5">
                      {parseHTML(parseCardText(card.back_text))}
                    </Text>
                  </div>
                ) : (
                  <div className="pt-20">
                    <Text className="text-center text-2xl font-bold">{card?.traits}</Text>
                    <Text className="text-center text-2xl pt-5">
                      {card?.text ? parseHTML(parseCardText(card.text)) : ""}
                    </Text>
                  </div>
                )
              ) : (
                <div className="pt-20">
                  <Text className="text-center text-2xl font-bold">{card?.traits}</Text>
                  <Text className="text-center text-2xl pt-5">
                    {card?.text ? parseHTML(parseCardText(card.text)) : ""}
                  </Text>
                </div>
              )}

              <div className="pt-20">
                <Text className="text-center italic">{card?.flavor}</Text>
                <Text className="text-center font-bold pt-5">{card?.pack_name}</Text>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <HoverGradient direction="left" className="w-40 cursor-pointer" onClick={moveRight} />
      </div>
    </Modal>
  );
};

interface HoverGradientProps {
  onClick?: () => void;
  direction: "left" | "right";
  className?: string;
}

const HoverGradient: React.FC<HoverGradientProps> = ({ onClick, direction, className = "" }) => {
  const [mousePosition, setMousePosition] = useState<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage =
        direction === "left" ? (x / rect.width) * 100 : ((rect.width - x) / rect.width) * 100;

      setMousePosition(Math.max(0, Math.min(100, percentage)));
    },
    [direction]
  );

  const handleMouseLeave = useCallback(() => {
    setMousePosition(null);
  }, []);

  const gradientStyle = {
    background:
      mousePosition === null
        ? "transparent"
        : `linear-gradient(to ${direction}, 
        rgba(255,255,255,${(mousePosition / 100) * 0.3}) 0%,
        transparent 100%)`,
  };

  const iconStyle = {
    opacity: mousePosition === null ? 0.1 : mousePosition / 100,
    transform:
      mousePosition === null
        ? "translateX(0)"
        : `translateX(${direction === "left" ? -(mousePosition / 5) : mousePosition / 5}px)`,
  };

  return (
    <div
      className={`h-full transition-all duration-200 relative ${className}`}
      style={gradientStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="absolute top-1/2 -translate-y-1/2" style={iconStyle}>
        {direction === "right" ? (
          <ChevronLeft className="w-16 h-16 text-white" />
        ) : (
          <ChevronRight className="w-16 h-16 text-white" />
        )}
      </div>
    </div>
  );
};

export default CardModal;
