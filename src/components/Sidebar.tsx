import { Accordion, Button, Divider, SegmentedControl, Text } from "@mantine/core";
import TextFilter from "./Sidebar/TextFilter.tsx";
import { ReactNode, useState } from "react";
import FactionFilter from "./Sidebar/FactionFilter.tsx";
import XPFilter from "./Sidebar/XPFilter.tsx";
import ResourceFilter from "./Sidebar/ResourceFilter.tsx";
import TypeFilter from "./Sidebar/TypeFilter.tsx";
import TraitFilter from "./Sidebar/TraitFilter.tsx";
import { Card } from "../types/api.ts";
import PackFilter from "./Sidebar/PackFilter.tsx";
import InvestigatorFilter from "./Sidebar/InvestigatorFilter.tsx";
import { useFilterStore } from "../lib/filter.ts";
import {
  BookOpen,
  FileSearch,
  GalleryHorizontalEndIcon,
  Info,
  MapIcon,
  PackageIcon,
  SearchIcon,
  Settings,
  ShieldUser,
  TagsIcon,
  X,
} from "lucide-react";
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
        <SegmentedControl
          size="lg"
          data={[
            {
              label: (
                <div className="flex gap-2">
                  <SearchIcon />
                  <span>Card Search</span>
                </div>
              ),
              value: "search",
            },
            {
              label: (
                <div className="flex gap-2">
                  <GalleryHorizontalEndIcon />
                  <span>Deck List</span>
                </div>
              ),
              value: "deck",
            },
          ]}
        />
        <Divider className="mt-2" />
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
