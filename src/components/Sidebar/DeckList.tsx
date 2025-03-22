import { Button, Divider, Popover, Text, TextInput } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { GalleryHorizontalEndIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import DeckItem from "./DeckItem";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { Deck } from "../../types/deck";
import InvestigatorCombobox from "./InvestigatorComboBox";

// Initial decks array (could be fetched or come from props)
const initialDecks: Deck[] = [
  { cards: [], name: "Deck 1", id: "1" },
  { cards: [], name: "Deck 2", id: "2" },
  { cards: [], name: "Deck 3", id: "3" },
];

const DeckList = () => {
  const [deckFilter, setDeckFilter] = useInputState("");
  const [deckList, setDeckList] = useState(initialDecks);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = deckList.findIndex((deck) => deck.id === active.id);
      const newIndex = deckList.findIndex((deck) => deck.id === over?.id);
      setDeckList((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2">
        <div className="mx-2 flex justify-between items-center p-2 rounded-md">
          <div className="flex items-center justify-center gap-2">
            <GalleryHorizontalEndIcon className="h-7 w-7" />
            <Text className="text-2xl font-semibold">Deck List</Text>
          </div>
          <Popover position="right-start" withOverlay>
            <Popover.Target>
              <Button
                leftSection={<PlusIcon size={18} />}
                color="stone.6"
                size="sm"
                variant="filled"
              >
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
        </div>
        <TextInput
          className="mx-4"
          value={deckFilter}
          onChange={setDeckFilter}
          leftSection={<SearchIcon className="w-5 h-5 text-stone-300" />}
          placeholder="Filter decks"
          radius="md"
          size="md"
          classNames={{
            input: "bg-stone-800 text-stone-100 border-stone-600",
          }}
        />
        <Divider />
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={deckList.map((deck) => deck.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="h-80rounded-lg">
            <Text c="dimmed" className="text-sm font-semibold p-1">
              YOUR DECKS
            </Text>
            <Divider />
            <div className="flex flex-col">
              {deckList.map((deck) => (
                <div
                  key={deck.id}
                  className="transition-all transform hover:scale-105 hover:shadow-md"
                >
                  <DeckItem deck={deck} />
                </div>
              ))}
            </div>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DeckList;
