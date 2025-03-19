import { Divider, Modal, Slider, Text } from "@mantine/core";
import { useSettingsStore } from "../../lib/settings";

interface SettingsModalProps {
  opened: boolean;
  onClose: () => void;
}

const marks = [
  {
    value: 0,
    label: "Tiny",
  },
  {
    value: 25,
    label: "Small",
  },
  {
    value: 50,
    label: "Medium",
  },
  {
    value: 75,
    label: "Large",
  },
  {
    value: 100,
    label: "Huge",
  },
];

const SettingsModal = ({ opened, onClose }: SettingsModalProps) => {
  const settingsStore = useSettingsStore();

  return (
    <Modal opened={opened} onClose={onClose} size={"md"} title="Settings">
      <div className="flex flex-col p-2">
        <div className="flex flex-col">
          <Text size="lg">Card Size</Text>
          <Text size="sm" c="dimmed">
            Adjust the size of cards in the grid
          </Text>
          <Slider
            value={settingsStore.cardSize}
            onChange={settingsStore.setCardSize}
            marks={marks}
            restrictToMarks
            size={"md"}
            label={null}
          />
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
