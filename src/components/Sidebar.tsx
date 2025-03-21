import { Accordion, Button, Divider, Text } from "@mantine/core";
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

interface SidebarProps {
  cards: Card[];
}

interface AccordionItemProps {
  name: string;
  children: ReactNode;
  icon?: ReactNode;
}

const AccordionItem = ({ name, children, icon }: AccordionItemProps) => {
  return (
    <Accordion.Item key={name} value={name}>
      <Accordion.Control icon={icon}>
        <Text fw={500} size="lg">
          {name}
        </Text>
      </Accordion.Control>
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
      <div className="overflow-auto">
        <Text fw={500} className="text-3xl text-center p-1">
          Arkham Card Search
        </Text>
        <Divider />
        <Accordion
          multiple
          value={value}
          onChange={setValue}
          classNames={{
            label: "p-1",
          }}
        >
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
                className="h-7 w-7 fill-stone-300"
              >
                {" "}
                <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)">
                  {" "}
                  <path d="M955 2774 c-48 -25 -61 -41 -104 -127 -26 -52 -48 -118 -62 -182 -12 -55 -32 -140 -46 -190 -15 -55 -28 -135 -33 -205 -12 -199 -25 -204 -290 -133 -30 8 -76 17 -101 20 -42 4 -48 2 -72 -27 -16 -19 -27 -44 -27 -61 0 -102 176 -355 287 -412 33 -17 83 -71 83 -89 0 -6 -46 -54 -102 -107 -133 -127 -318 -336 -318 -362 0 -33 44 -66 116 -88 38 -11 105 -38 150 -60 44 -21 95 -42 112 -46 17 -3 43 -15 57 -26 23 -19 25 -27 25 -98 0 -62 4 -81 18 -94 10 -9 67 -24 143 -36 149 -24 311 -80 402 -139 119 -78 245 -119 331 -107 65 8 166 51 252 105 91 57 234 107 377 131 151 25 165 32 177 83 25 99 32 116 58 134 42 29 254 138 295 151 78 26 106 73 74 127 -23 39 -289 321 -342 362 -86 67 -83 99 12 153 87 50 170 140 232 254 68 122 79 188 38 229 -39 39 -69 42 -150 13 -69 -25 -194 -57 -222 -57 -7 0 -27 11 -43 25 -35 30 -47 69 -62 220 -36 337 -134 601 -240 645 -31 13 -59 12 -210 -11 -119 -17 -548 -14 -650 5 -107 20 -128 20 -165 0z m1155 -1491 c20 -25 22 -36 16 -103 -8 -94 -68 -325 -103 -393 -77 -153 -237 -327 -353 -385 -192 -96 -341 -60 -531 128 -117 117 -183 214 -237 352 -44 112 -92 297 -92 353 0 67 52 81 161 45 142 -48 187 -53 514 -53 281 0 317 2 385 21 41 11 95 29 120 40 64 29 94 28 120 -5z" />{" "}
                </g>{" "}
              </svg>
            }
          >
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
