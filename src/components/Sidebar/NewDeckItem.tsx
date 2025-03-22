import { ActionIcon, Button, Divider, Text, TextInput } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { X } from "lucide-react";

interface NewDeckItemProps {
  onAdd: (deckName: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const NewDeckItem = ({ onAdd, setIsOpen }: NewDeckItemProps) => {
  const [nameInput, setNameInput] = useInputState("");

  return (
    <div>
      <div className="p-2 flex flex-col">
        <div className="flex items-center">
          <Text className="font-semibold text-sm flex-1 text-stone-300">NEW DECK</Text>
          <ActionIcon variant="subtle" color="stone.3" onClick={() => setIsOpen(false)}>
            <X />
          </ActionIcon>
        </div>
        <div className="flex gap-2 pt-1 items-center">
          <TextInput
            placeholder="Deck name"
            radius="md"
            size="sm"
            value={nameInput}
            onChange={setNameInput}
            className="flex-1"
            classNames={{
              input: "bg-stone-800 text-stone-100 border-stone-600",
            }}
          />
          <Button size="sm" onClick={() => onAdd(nameInput)}>
            Add
          </Button>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default NewDeckItem;
