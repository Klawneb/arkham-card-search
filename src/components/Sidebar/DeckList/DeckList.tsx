import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button, Divider, Text, TextInput } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { GalleryHorizontalEndIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { useDeckStore } from "../../../lib/deckStore";
import DeckItem from "./DeckItem";
import NewDeckItem from "./NewDeckItem";
const DeckList = () => {
  const [deckFilter, setDeckFilter] = useInputState("");
  const [isNewDeckOpen, setisNewDeckOpen] = useState(false);
  const deckStore = useDeckStore();

  const decks = deckStore.decks;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = decks.findIndex((deck) => deck.id === active.id);
      const newIndex = decks.findIndex((deck) => deck.id === over?.id);
      deckStore.setDecks(arrayMove(decks, oldIndex, newIndex));
    }
  };

  function handleDeckAdd(name: string) {
    deckStore.createDeck(name);
  }

  return (
    <div className="flex flex-col overflow-x-hidden">
      <div className="flex flex-col gap-2">
        <div className="mx-2 flex justify-between items-center p-2 rounded-md">
          <div className="flex items-center justify-center gap-2">
            <GalleryHorizontalEndIcon className="h-7 w-7" />
            <Text className="text-2xl font-semibold">Deck List</Text>
          </div>
          <Button
            leftSection={<PlusIcon size={18} />}
            onClick={() => setisNewDeckOpen(true)}
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
            input: "bg-stone-900 text-stone-100 border-stone-600",
          }}
        />
        <Divider />
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={decks.map((deck) => deck.id)}
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
              {decks.map((deck) => (
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
