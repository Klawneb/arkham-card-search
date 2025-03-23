import { ActionIcon, Button, Divider, Text, useMantineTheme } from "@mantine/core";
import { Deck } from "../../types/deck";
import { EllipsisVerticalIcon } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDeckStore } from "../../lib/deckStore";

interface DeckItemProps {
  deck: Deck;
}

const DeckItem = ({ deck }: DeckItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: deck.id,
  });
  const theme = useMantineTheme();
  const deckStore = useDeckStore();
  const isActive = deckStore.currentDeck?.id === deck.id;

  const style = {
    transform: transform ? CSS.Transform.toString({ ...transform, x: 0 }) : undefined,
    transition,
    backgroundColor: isActive ? theme.colors.teal[8] : undefined,
  };

  function handleClick() {
    deckStore.setCurrentDeck(deck);
  }

  return (
    <div
      className="flex flex-col"
      ref={setNodeRef}
      style={style}
      {...attributes}
      onClick={handleClick}
    >
      <div className={`flex items-center p-2 hover:bg-stone-600 transition-colors justify-between`}>
        <div className="flex items-center gap-2 px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            {...listeners}
            className={`w-4 opacity-50 ${isDragging ? "cursor-grabbing" : "cursor-grab"} ${
              isActive ? "fill-stone-50" : "fill-stone-300"
            }`}
          >
            <path
              d="M15.84 10.61333125c0 0.36081875 -0.29251875 0.65331875 -0.65333125 0.6533375H0.81333125c-0.50293125 0.00001875 -0.8172625 -0.5444125 -0.56581875 -0.979975 0.11670625 -0.20215625 0.3324 -0.32669375 0.56581875 -0.32669375h14.3733375c0.3608125 0.00001875 0.65333125 0.29251875 0.65333125 0.65333125ZM0.81333125 6.04h14.3733375c0.50293125 0 0.81726875 -0.54444375 0.5658 -0.98 -0.11670625 -0.20214375 -0.3323875 -0.32666875 -0.5658 -0.32666875H0.81333125c-0.50293125 0 -0.81726875 0.54444375 -0.5658 0.98 0.11670625 0.20214375 0.3323875 0.32666875 0.5658 0.32666875Z"
              strokeWidth={1}
            />
          </svg>
          <Text className={`font-semibold text-lg ${isActive ? "text-stone-50": "text-stone-300"}`}>{deck.name}</Text>
          {deck.investigator && <Text>- {deck.investigator.name}</Text>}
        </div>
        <div className="flex items-center gap-4">
          <ActionIcon size="md" variant="subtle" className="">
            <EllipsisVerticalIcon className="w-6 h-6 text-stone-300" />
          </ActionIcon>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default DeckItem;
