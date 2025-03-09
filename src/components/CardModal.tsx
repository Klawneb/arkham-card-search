import { MantineTransition, Modal, Image, AspectRatio, Overlay } from "@mantine/core";
import { Card, TypeName } from "../types/api";
import parseHTML from "html-react-parser";
import { parseCardText } from "../lib/parsers";
import { useHotkeys } from "@mantine/hooks";

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

function onBackgroundClicked(e: React.MouseEvent<HTMLDivElement>, closeFunction: () => void) {
  if (e.target === e.currentTarget) {
    closeFunction();
  }
}

const CardModal = ({ onClose, opened, card, setModalCard, cards }: CardModalProps) => {
  useHotkeys([
    ["ArrowRight", () => advanceCard(1)],
    ["ArrowLeft", () => advanceCard(-1)],
  ]);

  function advanceCard(direction: number) {
    if (!card) {
      return;
    }
    const currentIndex = cards.findIndex((c) => c.code === card.code);
    const newIndex = currentIndex + direction;
    if (newIndex < 0 || newIndex >= cards.length) {
      const wrapIndex = (newIndex + cards.length) % cards.length;
      setModalCard(cards[wrapIndex]);
      return;
    }
    setModalCard(cards[newIndex]);
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
      <Modal.Overlay backgroundOpacity={0.9} blur={5} className="flex justify-center items-end ">
        <p className="p-2 opacity-50">Use the arrow keys to cycle through cards</p>
      </Modal.Overlay>
      <Modal.Content>
        <Modal.Body>
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
              <div >
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
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default CardModal;
