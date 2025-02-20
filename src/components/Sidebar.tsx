import { Accordion, Divider } from "@mantine/core";
import TextFilter from "./Sidebar/TextFilter.tsx";
import React, { useState } from "react";
import FactionFilter from "./Sidebar/FactionFilter.tsx";
import XPFilter from "./Sidebar/XPFilter.tsx";
import ResourceFilter from "./Sidebar/ResourceFilter.tsx";

interface AccordionItemProps {
  name: string;
  Component: React.FC;
}

const AccordionItem = ({ name, Component }: AccordionItemProps) => {
  return (
    <Accordion.Item key={name} value={name}>
      <Accordion.Control>{name}</Accordion.Control>
      <Accordion.Panel styles={{ content: { padding: "0" } }}>
        <Component />
      </Accordion.Panel>
    </Accordion.Item>
  );
};

const Sidebar = () => {
  const [value, setValue] = useState<string[]>(["Search"]);

  return (
    <div className={"h-full w-80 bg-stone-800"}>
      <p className="text-center text-2xl">Card Filter</p>
      <Divider />
      <Accordion multiple styles={{ label: { padding: 6 } }} value={value} onChange={setValue}>
        <AccordionItem name={"Search"} Component={TextFilter} />
        <AccordionItem name={"Faction"} Component={FactionFilter} />
        <AccordionItem name={"XP Cost"} Component={XPFilter} />
        <AccordionItem name={"Resource Cost"} Component={ResourceFilter} />
      </Accordion>
    </div>
  );
};

export default Sidebar;
