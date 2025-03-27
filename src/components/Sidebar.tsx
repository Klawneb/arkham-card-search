import { Button, Divider, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Info, Settings, X } from "lucide-react";
import { useState } from "react";
import { useFilterStore } from "../lib/filter.ts";
import AboutModal from "./Sidebar/AboutModal.tsx";
import CardSearch from "./Sidebar/Filters/CardSearch.tsx";
import SettingsModal from "./Sidebar/SettingsModal.tsx";

const Sidebar = () => {
  const filterStore = useFilterStore();
  const [settingsOpened, settingsHandlers] = useDisclosure();
  const [aboutOpened, aboutHandlers] = useDisclosure();
  const [sidebarMenu, setSidebarMenu] = useState("search");

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
    <div className={`flex flex-col h-full w-80 bg-stone-800 justify-between overflow-hidden`}>
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Text fw={500} className="text-3xl text-center p-1">
          Arkham Card Tools
        </Text>
        <Divider />
        <CardSearch />
      </div>

      <div className="flex flex-col justify-center gap-2">
        <div className="w-full px-2">
          <Button
            className="w-full"
            onClick={clearFilters}
            color="red"
            size="lg"
            leftSection={<X />}
          >
            Clear Filters
          </Button>
        </div>

        <Divider />
        <div className="flex gap-2 justify-between px-2 pb-2">
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
