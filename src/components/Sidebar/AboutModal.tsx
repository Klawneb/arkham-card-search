import { Modal, Anchor, Text } from "@mantine/core";

interface AboutModalProps {
  opened: boolean;
  onClose: () => void;
}
const AboutModal = ({ opened, onClose }: AboutModalProps) => {
  return (
    <Modal opened={opened} onClose={onClose} size={"auto"} title="About">
      <div className="flex flex-col">
        <Text>
          Thanks to <Anchor href="https://arkhamdb.com/">ArkhamDB</Anchor> for their excellent API.
        </Text>
        <Text className="mt-6">
          If you discover any bugs feel free to submit an {" "}
          <Anchor href="https://github.com/Klawneb/arkham-card-search/issues">
            issue on Github.
          </Anchor>
        </Text>
      </div>
    </Modal>
  );
};

export default AboutModal;
