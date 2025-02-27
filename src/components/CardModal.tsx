import { Modal } from "@mantine/core";
import { Card } from "../types/api";

interface CardModalProps {
  opened: boolean;
  onClose: () => void;
  card: Card | null;
}

const CardModal = ({ onClose, opened, card }: CardModalProps) => {
  return (
    <Modal opened={opened} onClose={onClose} withCloseButton={false}>
      {card?.name}
    </Modal>
  );
};

export default CardModal;
