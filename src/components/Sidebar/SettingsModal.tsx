import { Divider, Modal, Slider, Switch, Text, useMantineColorScheme } from "@mantine/core";
import { useSettingsStore } from "../../lib/settings";
import { MoonIcon, Proportions, Ruler } from "lucide-react";

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
  const { toggleColorScheme, colorScheme } = useMantineColorScheme({
    keepTransitions: true
  });

  return (
    <Modal opened={opened} onClose={onClose} size={"md"} title="Settings">
      <div className="flex flex-col p-2">
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
        <Divider className="mt-10" />
        <div className="flex mt-4 items-center gap-2">
          <MoonIcon />
          <Text fw={500} size="lg">
            Dark Mode:
          </Text>
          <Switch
            size="lg"
            onChange={toggleColorScheme}
            checked={colorScheme === "dark"}
            defaultChecked
          />
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
