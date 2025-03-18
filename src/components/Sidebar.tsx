import { Accordion, Divider } from "@mantine/core";
import TextFilter from "./Sidebar/TextFilter.tsx";
import { ReactNode, useState } from "react";
import FactionFilter from "./Sidebar/FactionFilter.tsx";
import XPFilter from "./Sidebar/XPFilter.tsx";
import ResourceFilter from "./Sidebar/ResourceFilter.tsx";
import TypeFilter from "./Sidebar/TypeFilter.tsx";
import TraitFilter from "./Sidebar/TraitFilter.tsx";
import { Card } from "../types/api.ts";
import PackFilter from "./Sidebar/PackFilter.tsx";
import InvestigatorFilter from "./InvestigatorFilter.tsx";

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

  return (
    <div className={"h-full w-80 bg-stone-800"}>
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
  );
};

export default Sidebar;
