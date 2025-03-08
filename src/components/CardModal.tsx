import { MantineTransition, Modal, Image, AspectRatio } from "@mantine/core";
import { Card, TypeName } from "../types/api";
import parseHTML from "html-react-parser";
import { parseCardText } from "../lib/parsers";

interface CardModalProps {
  opened: boolean;
  onClose: () => void;
  card: Card | null;
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

const CardModal = ({ onClose, opened, card }: CardModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      closeOnClickOutside={true}
      centered
      size={"auto"}
      className="container"
      transitionProps={{ transition: enterTransition }}
      overlayProps={{ blur: 5, backgroundOpacity: 0.9 }}
      classNames={{
        content: "bg-transparent",
      }}
    >
      <div className="grid grid-cols-[500px,auto,500px] h-[50vh]">
        <div onClick={(e) => onBackgroundClicked(e, onClose)}></div>
        <AspectRatio ratio={card?.type_name === TypeName.Investigator ? 7 / 5 : 5 / 7}>
          <Image
            src={`https://arkhamdb.com${card?.imagesrc}`}
            alt={`${card?.name} card art`}
            className="h-full object-contain"
          />
        </AspectRatio>
        <div
          className="flex flex-col justify-between p-10"
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
    </Modal>
  );
};

export default CardModal;
