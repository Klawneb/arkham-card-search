import { MantineTransition, Modal, Image, AspectRatio } from "@mantine/core";
import { Card, TypeName } from "../types/api";

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

const CardModal = ({ onClose, opened, card }: CardModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      size={"auto"}
      className="container"
      transitionProps={{ transition: enterTransition }}
      overlayProps={{ blur: 5, backgroundOpacity: 0.8 }}
      classNames={{
        root: "bg-white"
      }}
    >
      <div className="grid grid-cols-[500px,auto,500px] h-[60vh]">
        <div></div>
        <AspectRatio ratio={card?.type_name === TypeName.Investigator ? 7 / 5 : 5 / 7} >
          <Image
            src={`https://arkhamdb.com${card?.imagesrc}`}
            alt={`${card?.name} card art`}
            className="h-full object-contain"
          />
        </AspectRatio>
        <div className="flex flex-col justify-between p-10">
          <div>
            <h2 className="text-center text-4xl">{card?.name}</h2>
            <p className="text-center font-bold text-xl">{card?.type_name}</p>
          </div>
          <div>
            <p className="text-center text-xl font-bold">{card?.traits}</p>
            <p className="text-center text-xl">{card?.text}</p>
          </div>
          <div>
            <p className="text-center text-md italic">{card?.flavor}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CardModal;
