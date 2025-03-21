import { Button, Text } from "@mantine/core";
import { PlusIcon } from "lucide-react";

const CardIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      className="w-8 h-8"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3.604 7.197l7.138 -3.109a.96 .96 0 0 1 1.27 .527l4.924 11.902a1 1 0 0 1 -.514 1.304l-7.137 3.109a.96 .96 0 0 1 -1.271 -.527l-4.924 -11.903a1 1 0 0 1 .514 -1.304z" />
      <path d="M15 4h1a1 1 0 0 1 1 1v3.5" />
      <path d="M20 6c.264 .112 .52 .217 .768 .315a1 1 0 0 1 .53 1.311l-2.298 5.374" />
    </svg>
  );
};

const DeckList = () => {


  return (
    <div>
      <div className={`m-2 flex justify-between items-center p-2 rounded-md`}>
        <div className="flex items-center justify-center gap-2">
          <CardIcon />
          <Text className="text-2xl font-semibold">Deck List</Text>
        </div>
        <Button leftSection={<PlusIcon size={18}/>} size="xs">New</Button>
      </div>
    </div>
  );
};

export default DeckList;
