import { Accordion, Button, Divider, Modal } from "@mantine/core";
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
import { Info, Settings, X } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import SettingsModal from "./Sidebar/SettingsModal.tsx";
import { useBackgroundColor } from "../lib/colors.ts";

interface SidebarProps {
  cards: Card[];
}

interface AccordionItemProps {
  name: string;
  children: ReactNode;
}

const AccordionItem = ({ name, children }: AccordionItemProps) => {
  return (
    <Accordion.Item key={name} value={name}>
      <Accordion.Control>{name}</Accordion.Control>
      <Accordion.Panel styles={{ content: { padding: "0" } }}>{children}</Accordion.Panel>
    </Accordion.Item>
  );
};

const Sidebar = ({ cards }: SidebarProps) => {
  const [value, setValue] = useState<string[]>(["Search"]);
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
        <p className="text-center text-2xl">Card Filter</p>
        <Divider />
        <Accordion multiple styles={{ label: { padding: 6 } }} value={value} onChange={setValue}>
          <AccordionItem name={"Search"}>
            <TextFilter />
          </AccordionItem>
          <AccordionItem name={"Packs"}>
            <PackFilter />
          </AccordionItem>
          <AccordionItem name={"Faction"}>
            <FactionFilter />
          </AccordionItem>
          <AccordionItem name={"XP Cost"}>
            <XPFilter />
          </AccordionItem>
          <AccordionItem name={"Resource Cost"}>
            <ResourceFilter />
          </AccordionItem>
          <AccordionItem name={"Type"}>
            <TypeFilter />
          </AccordionItem>
          <AccordionItem name={"Traits"}>
            <TraitFilter cards={cards} />
          </AccordionItem>
          <AccordionItem name={"Investigator"}>
            <InvestigatorFilter cards={cards} />
          </AccordionItem>
        </Accordion>
      </div>

      <div className="flex flex-col justify-center p-2">
        <Button onClick={clearFilters} color="red" size="lg" className="m-2" leftSection={<X />}>
          Clear Filters
        </Button>
        <Divider />
        <div className="flex gap-2 justify-between p-2">
          <Button leftSection={<Info />} className="flex-1">
            About
          </Button>
          <Button leftSection={<Settings />} className="flex-1" onClick={settingsHandlers.open}>
            Settings
          </Button>
        </div>
      </div>

      <SettingsModal onClose={settingsHandlers.close} opened={settingsOpened} />
    </div>
  );
};

export default Sidebar;
