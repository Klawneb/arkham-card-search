import { Divider, Modal, Slider, Switch, Text, useMantineColorScheme } from "@mantine/core";
import { useSettingsStore } from "../../lib/settings";
import { MoonIcon, Proportions, SettingsIcon } from "lucide-react";

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
    <Modal.Root opened={opened} onClose={onClose} size={"md"}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <div className="flex gap-2 items-center">
              <SettingsIcon className="w-7 h-7" />
              <Text className="text-2xl font-semibold">Settings</Text>
            </div>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col p-3 pb-6">
            <div className="flex flex-col">
              <div className="flex gap-2">
                <Proportions />
                <Text fw={500} size="lg">
                  Card Size
                </Text>
              </div>

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
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default SettingsModal;
