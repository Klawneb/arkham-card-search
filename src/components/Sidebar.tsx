import { Button, Divider, SegmentedControl, Text } from "@mantine/core";
import { useFilterStore } from "../lib/filter.ts";
import { GalleryHorizontalEndIcon, Info, SearchIcon, Settings, X } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import SettingsModal from "./Sidebar/SettingsModal.tsx";
import { useBackgroundColor } from "../lib/colors.ts";
import AboutModal from "./Sidebar/AboutModal.tsx";
import CardSearch from "./Sidebar/CardSearch.tsx";
import { useState } from "react";
import DeckList from "./Sidebar/DeckList.tsx";
import { AnimatePresence, motion } from "framer-motion";

const Sidebar = () => {
  const filterStore = useFilterStore();
  const [settingsOpened, settingsHandlers] = useDisclosure();
  const [aboutOpened, aboutHandlers] = useDisclosure();
  const bgColor = useBackgroundColor("bg-stone-800", "bg-stone-100");
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
    <div className={`flex flex-col h-full w-80 ${bgColor} justify-between overflow-hidden`}>
      <div className="flex flex-col">
        <Text fw={500} className="text-3xl text-center p-1">
          Arkham Card Tools
        </Text>
        <Divider />
        <SegmentedControl
          size="lg"
          value={sidebarMenu}
          onChange={setSidebarMenu}
          className="my-2 mx-1"
          classNames={{
            root: "bg-stone-900",
            indicator: "bg-stone-700",
            label: "flex items-center justify-center",
          }}
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
        <Divider />
        <AnimatePresence mode="wait">
          {sidebarMenu === "search" ? (
            <motion.div key="search" initial={{ x: 200 }} animate={{ x: 0 }}>
              <CardSearch />
            </motion.div>
          ) : (
            <motion.div key="deck" initial={{ x: -200 }} animate={{ x: 0 }}>
              <DeckList />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col justify-center p-2 gap-1 overflow-hidden">
        <AnimatePresence>
          {sidebarMenu === "search" && (
            <motion.div
              initial={{ x: 200 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <Button
                className="w-full"
                onClick={clearFilters}
                color="red"
                size="lg"
                leftSection={<X />}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <Divider />
        <div className="flex gap-2 justify-between">
          <Button
            color="stone.7"
            leftSection={<Info />}
            className="flex-1"
            onClick={aboutHandlers.open}
          >
            About
          </Button>
          <Button
            color="stone.7"
            leftSection={<Settings />}
            className="flex-1"
            onClick={settingsHandlers.open}
          >
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
