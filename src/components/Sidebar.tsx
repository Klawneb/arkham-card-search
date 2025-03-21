import { Button, Divider, Text } from "@mantine/core";
import { Card } from "../types/api.ts";
import { useFilterStore } from "../lib/filter.ts";
import { Info, Settings, X } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import SettingsModal from "./Sidebar/SettingsModal.tsx";
import { useBackgroundColor } from "../lib/colors.ts";
import AboutModal from "./Sidebar/AboutModal.tsx";
import CardSearch from "./Sidebar/CardSearch.tsx";

interface SidebarProps {
  cards: Card[];
}

const Sidebar = ({ cards }: SidebarProps) => {
  const filterStore = useFilterStore();
  const [settingsOpened, settingsHandlers] = useDisclosure();
  const [aboutOpened, aboutHandlers] = useDisclosure();
  const bgColor = useBackgroundColor("bg-stone-800", "bg-stone-100");

  function clearFilters() {
    filterStore.setTextFilter("");
    filterStore.setPackFilter([]);
    filterStore.setFactionFilter([]);
    filterStore.setxpFilter([0, 10]);
    filterStore.setResourceFilter([-2, 12]);
    filterStore.setTypeFilter([]);
    filterStore.setTraitFilter([]);
    filterStore.setInvestigatorFilter(null);
  }

  return (
    <div className={`flex flex-col h-full w-80 ${bgColor} justify-between`}>
      <div>
        <Text fw={500} className="text-3xl text-center p-1">
          Arkham Card Search
        </Text>
        <Divider />
        <CardSearch cards={cards} />
      </div>
      <div className="flex flex-col justify-center p-2">
        
        <Button onClick={clearFilters} color="red" size="lg" className="m-2" leftSection={<X />}>
          Clear Filters
        </Button>
        <Divider />
        <div className="flex gap-2 justify-between p-2">
          <Button leftSection={<Info />} className="flex-1" onClick={aboutHandlers.open}>
            About
          </Button>
          <Button leftSection={<Settings />} className="flex-1" onClick={settingsHandlers.open}>
            Settings
          </Button>
        </div>
      </div>

      <SettingsModal onClose={settingsHandlers.close} opened={settingsOpened} />
      <AboutModal onClose={aboutHandlers.close} opened={aboutOpened} />
    </div>
  );
};

export default Sidebar;
