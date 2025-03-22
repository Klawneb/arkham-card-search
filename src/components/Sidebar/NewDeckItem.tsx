import { ActionIcon, Button, Divider, Text, TextInput } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { X } from "lucide-react";
import { useState } from "react";

interface NewDeckItemProps {
  onAdd: (deckName: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const NewDeckItem = ({ onAdd, setIsOpen }: NewDeckItemProps) => {
  const [nameInput, setNameInput] = useInputState("");
  const [isNameError, setIsNameError] = useState(false);

  function handleAdd() {
    if (nameInput.trim().length === 0) {
      setIsNameError(true);
      return;
    }
    onAdd(nameInput);
    setIsNameError(false);
    setIsOpen(false);
  }

  function handleNameInput(value: string) {
    setNameInput(value);
  }

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
            error={isNameError}
            onChange={(e) => handleNameInput(e.currentTarget.value)}
            className="flex-1"
            classNames={{
              input: `bg-stone-800 text-stone-100 ${
                isNameError ? "border-red-500" : "border-stone-600"
              }`,
            }}
          />
          <Button size="sm" onClick={() => handleAdd()}>
            Add
          </Button>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default NewDeckItem;
