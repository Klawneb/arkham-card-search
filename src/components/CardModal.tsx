import { Modal } from "@mantine/core";
import { Card } from "../types/api";

interface CardModalProps {
  opened: boolean;
  onClose: () => void;
  card: Card | null;
}

const CardModal = ({ onClose, opened, card }: CardModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      size={"auto"}
      className="container"
    >
      <div className="grid grid-cols-[500px,auto,500px]">
        <div>
        </div>
        <img
          src={`https://arkhamdb.com${card?.imagesrc}`}
          alt={`${card?.name} card art`}
          className="h-[60vh]"
        />
        <div className="flex flex-col">
          <h2 className="text-center text-4xl">{card?.name}</h2>
          <p className="text-center text-xl">{card?.text}</p>
        </div>
      </div>
    </Modal>
  );
};

export default CardModal;
