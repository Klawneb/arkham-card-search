import { Accordion, Text } from "@mantine/core";
import { ReactNode, useState } from "react";
import TextFilter from "./TextFilter";
import PackFilter from "./PackFilter";
import FactionFilter from "./FactionFilter";
import XPFilter from "./XPFilter";
import ResourceFilter from "./ResourceFilter";
import TypeFilter from "./TypeFilter";
import TraitFilter from "./TraitFilter";
import {
  BookOpen,
  FileSearch,
  MapIcon,
  PackageIcon,
  SearchIcon,
  ShieldUser,
  TagsIcon,
} from "lucide-react";
import { Card } from "../../types/api";
import InvestigatorFilter from "./InvestigatorFilter";
import { useBackgroundColor } from "../../lib/colors";

interface AccordionItemProps {
  name: string;
  children: ReactNode;
  icon?: ReactNode;
}

interface CardSearchProps {
  cards: Card[];
}

const AccordionItem = ({ name, children, icon }: AccordionItemProps) => {
  return (
    <Accordion.Item key={name} value={name}>
      <Accordion.Control
        icon={icon}
        className="bg-stone-800 hover:bg-stone-700 transition-colors"
      >
        <Text fw={500} size="lg" className="text-stone-300">
          {name}
        </Text>
      </Accordion.Control>
      <Accordion.Panel classNames={{ content: "bg-stone-800 text-stone-200 p-0" }}>
        {children}
      </Accordion.Panel>
    </Accordion.Item>
  );
};

const CardSearch = ({ cards }: CardSearchProps) => {
  const [value, setValue] = useState<string[]>(["Search"]);
  const iconColor = useBackgroundColor("fill-stone-300", "fill-stone-800");

  return (
    <div className=" bg-stone-800 shadow-lg overflow-auto">
      <Accordion multiple value={value} onChange={setValue}>
        <AccordionItem name={"Search"} icon={<SearchIcon className="w-7 h-7" />}>
          <TextFilter />
        </AccordionItem>
        <AccordionItem name={"Packs"} icon={<MapIcon className="w-7 h-7" />}>
          <PackFilter />
        </AccordionItem>
        <AccordionItem name={"Faction"} icon={<ShieldUser className="w-7 h-7" />}>
          <FactionFilter />
        </AccordionItem>
        <AccordionItem name={"XP Cost"} icon={<BookOpen className="w-7 h-7" />}>
          <XPFilter />
        </AccordionItem>
        <AccordionItem name={"Resource Cost"} icon={<PackageIcon className="w-7 h-7" />}>
          <ResourceFilter />
        </AccordionItem>
        <AccordionItem name={"Type"} icon={<FileSearch className="w-7 h-7" />}>
          <TypeFilter />
        </AccordionItem>
        <AccordionItem name={"Traits"} icon={<TagsIcon className="w-7 h-7" />}>
          <TraitFilter cards={cards} />
        </AccordionItem>
        <AccordionItem
          name={"Investigator"}
          icon={
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="300.000000pt"
              height="300.000000pt"
              viewBox="0 0 300.000000 300.000000"
              preserveAspectRatio="xMidYMid meet"
              className={`h-7 w-7 ${iconColor}`}
            >
              <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)">
                <path d="M955 2774 c-48 -25 -61 -41 -104 -127 -26 -52 -48 -118 -62 -182 -12 -55 -32 -140 -46 -190 -15 -55 -28 -135 -33 -205 -12 -199 -25 -204 -290 -133 -30 8 -76 17 -101 20 -42 4 -48 2 -72 -27 -16 -19 -27 -44 -27 -61 0 -102 176 -355 287 -412 33 -17 83 -71 83 -89 0 -6 -46 -54 -102 -107 -133 -127 -318 -336 -318 -362 0 -33 44 -66 116 -88 38 -11 105 -38 150 -60 44 -21 95 -42 112 -46 17 -3 43 -15 57 -26 23 -19 25 -27 25 -98 0 -62 4 -81 18 -94 10 -9 67 -24 143 -36 149 -24 311 -80 402 -139 119 -78 245 -119 331 -107 65 8 166 51 252 105 91 57 234 107 377 131 151 25 165 32 177 83 25 99 32 116 58 134 42 29 254 138 295 151 78 26 106 73 74 127 -23 39 -289 321 -342 362 -86 67 -83 99 12 153 87 50 170 140 232 254 68 122 79 188 38 229 -39 39 -69 42 -150 13 -69 -25 -194 -57 -222 -57 -7 0 -27 11 -43 25 -35 30 -47 69 -62 220 -36 337 -134 601 -240 645 -31 13 -59 12 -210 -11 -119 -17 -548 -14 -650 5 -107 20 -128 20 -165 0z m1155 -1491 c20 -25 22 -36 16 -103 -8 -94 -68 -325 -103 -393 -77 -153 -237 -327 -353 -385 -192 -96 -341 -60 -531 128 -117 117 -183 214 -237 352 -44 112 -92 297 -92 353 0 67 52 81 161 45 142 -48 187 -53 514 -53 281 0 317 2 385 21 41 11 95 29 120 40 64 29 94 28 120 -5z" />
              </g>
            </svg>
          }
        >
          <InvestigatorFilter cards={cards} />
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CardSearch;
