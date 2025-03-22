import { Button, Divider, Popover, Text, TextInput } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { GalleryHorizontalEndIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useContext, useState } from "react";
import DeckItem from "./DeckItem";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { Deck } from "../../types/deck";
import NewDeckItem from "./NewDeckItem";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";

const initialDecks: Deck[] = [
  { cards: [], name: "Deck 1", id: "1" },
  { cards: [], name: "Deck 2", id: "2" },
  { cards: [], name: "Deck 3", id: "3" },
];

const DeckList = () => {
  const [deckFilter, setDeckFilter] = useInputState("");
  const [deckList, setDeckList] = useState(initialDecks);
  const [isNewDeckOpen, setisNewDeckOpen] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = deckList.findIndex((deck) => deck.id === active.id);
      const newIndex = deckList.findIndex((deck) => deck.id === over?.id);
      setDeckList((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  function handleDeckAdd(name: string) {
    const newDeck: Deck = {
      cards: [],
      id: uuidv4(),
      name,
    };

    setDeckList((prev) => [newDeck, ...prev]);
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2">
        <div className="mx-2 flex justify-between items-center p-2 rounded-md">
          <div className="flex items-center justify-center gap-2">
            <GalleryHorizontalEndIcon className="h-7 w-7" />
            <Text className="text-2xl font-semibold">Deck List</Text>
          </div>
          <Button
            leftSection={<PlusIcon size={18} />}
            onClick={() => setisNewDeckOpen(true)}
            color="stone.6"
            size="sm"
            variant="filled"
          >
            New
          </Button>
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
          <motion.div className="h-80 rounded-lg">
            <AnimatePresence>
              {isNewDeckOpen && (
                <motion.div
                  initial={{ height: 0, scaleY: 0 }}
                  animate={{ height: "auto", scaleY: 1 }}
                  exit={{ height: 0, scaleY: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ transformOrigin: "top" }}
                >
                  <NewDeckItem onAdd={handleDeckAdd} setIsOpen={setisNewDeckOpen} />
                </motion.div>
              )}
            </AnimatePresence>
            <Text c="dimmed" className="text-md font-semibold p-1 text-center">
              YOUR DECKS
            </Text>
            <Divider />
            <div className="flex flex-col">
              {deckList.map((deck) => (
                <motion.div
                  key={deck.id}
                  className="transition-all transform hover:scale-105 hover:shadow-md"
                >
                  <DeckItem deck={deck} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DeckList;
