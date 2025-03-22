import { Button, Popover, Text, TextInput } from "@mantine/core";
import { PlusIcon } from "lucide-react";
import InvestigatorCombobox from "./InvestigatorComboBox";
import { useContext, useState } from "react";
import { CardContext } from "../../App";
import { Card } from "../../types/api";

const NewDeckButton = () => {
  const cards = useContext(CardContext);
  const [selectedInvestigator, setSelectedInvestigator] = useState<Card | null>(null);

  return (
    <Popover position="right-start" withOverlay>
      <Popover.Target>
        <Button leftSection={<PlusIcon size={18} />} color="stone.6" size="sm" variant="filled">
          New
        </Button>
      </Popover.Target>
      <Popover.Dropdown className="bg-stone-800">
        <div className="flex flex-col gap-2 p-4">
          <Text size="sm" c="dimmed">
            Deck Name
          </Text>
          <TextInput
            placeholder="Enter deck name"
            radius="md"
            size="sm"
            classNames={{
              input: "bg-stone-800 text-stone-100 border-stone-600",
            }}
          />
          <Text size="sm" c="dimmed">
            Investigator
          </Text>
          <InvestigatorCombobox cards={cards} onSelect={setSelectedInvestigator} />
          <div className="flex gap-2 justify-between">
            <Button color="red" size="sm" variant="filled" className="w-20">
              Cancel
            </Button>
            <Button color="stone.6" size="sm" variant="filled" className="w-32">
              Create Deck
            </Button>
          </div>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default NewDeckButton;
