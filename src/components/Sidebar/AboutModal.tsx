import { Modal, Anchor, Text, List } from "@mantine/core";
import { InfoIcon } from "lucide-react";

interface AboutModalProps {
  opened: boolean;
  onClose: () => void;
}
const AboutModal = ({ opened, onClose }: AboutModalProps) => {
  return (
    <Modal.Root opened={opened} onClose={onClose} size={"auto"}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <div className="flex gap-2 items-center">
              <InfoIcon className="w-7 h-7" />
              <Text className="text-2xl font-semibold">About</Text>
            </div>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <List className="list-disc" spacing={"lg"}>
            <List.Item>
              Thanks to <Anchor href="https://arkhamdb.com/">ArkhamDB</Anchor> for their excellent
              API.
            </List.Item>
            <List.Item>All texts are copyrighted by Fantasy Flight Games.</List.Item>
            <List.Item>
              If you discover any bugs feel free to submit an{" "}
              <Anchor href="https://github.com/Klawneb/arkham-card-search/issues">
                issue on Github.
              </Anchor>
            </List.Item>
          </List>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default AboutModal;
