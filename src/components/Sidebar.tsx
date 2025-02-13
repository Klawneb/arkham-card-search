import { Accordion, Divider } from "@mantine/core";
import TextFilter from "./Sidebar/TextFilter.tsx";
import React from "react";

interface AccordionItemProps {
    name: string;
    Component: React.FC
}

const AccordionItem = ({
    name,
    Component
}: AccordionItemProps) => {
    return (
        <Accordion.Item key={name} value={name} >
            <Accordion.Control>{name}</Accordion.Control>
            <Accordion.Panel styles={{ content: { padding: "0" } }}>
                <Component />
            </Accordion.Panel>
        </Accordion.Item>
    );
};

const Sidebar = () => {
    return (
        <div className={"h-full w-80 bg-stone-800"}>
            <p className="text-center text-2xl">Card Filter</p>
            <Divider />
            <Accordion defaultValue={["Search"]} multiple>
                <AccordionItem name={"Search"} Component={TextFilter}/>
            </Accordion>
        </div>
    );
};

export default Sidebar;
