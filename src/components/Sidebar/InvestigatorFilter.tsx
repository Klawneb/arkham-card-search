import {
  AspectRatio,
  Combobox,
  TextInput,
  useCombobox,
  Image,
  Modal,
  MantineTransition,
  darken,
} from "@mantine/core";
import { Card, Faction, FactionColors, Type } from "../../types/api";
import { useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { X } from "lucide-react";
import { parseCardText } from "../../lib/parsers";
import parseHTML from "html-react-parser";
import FlipCard from "../FlipCard";
import { useFilterStore } from "../../lib/filter";

interface InvestigatorFilterProps {
  cards: Card[];
}

function getTextColor(faction: string) {
  if (faction === "Seeker") {
    return "text-stone-300";
  }

  if (faction === "Neutral") {
    return "text-white";
  }

  return "text-stone-400";
}

const enterTransition: MantineTransition = {
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 0 },
  transitionProperty: "opacity, scale",
};

function onBackgroundClicked(e: React.MouseEvent<HTMLDivElement>, closeFunction: () => void) {
  if (e.target === e.currentTarget) {
    closeFunction();
  }
}

const InvestigatorFilter = ({ cards }: InvestigatorFilterProps) => {
  const comboBox = useCombobox({});
  const [inputValue, setInputValue] = useState("");
  const [opened, handlers] = useDisclosure();
  const filterStore = useFilterStore();
  const inputRef = useRef<HTMLInputElement>(null);

  function getInvestigatorByCode(code: string) {
    return cards.find((card) => {
      return card.code === code;
    });
  }

  function getInvestigatorData() {
    const investigatorMap = new Map<string, Card[]>();

    cards.forEach((card) => {
      if (card.type_code != Type.Investigator) {
        return;
      }

      if (!investigatorMap.has(card.faction_name)) {
        investigatorMap.set(card.faction_name, []);
      }

      investigatorMap.get(card.faction_name)?.push(card);
    });

    return Object.fromEntries(investigatorMap.entries());
  }

  return (
    <div className="m-2 flex flex-col">
      <Combobox
        store={comboBox}
        onOptionSubmit={(value) => {
          setInputValue(getInvestigatorByCode(value)?.name ?? "");
          filterStore.setInvestigatorFilter(getInvestigatorByCode(value) ?? null);
          comboBox.closeDropdown();
          inputRef.current?.blur();
        }}
        classNames={{ groupLabel: "text-xl text-white" }}
      >
        <Combobox.Target>
          <TextInput
            placeholder="Investigator name"
            value={inputValue}
            ref={inputRef}
            onChange={(event) => {
              setInputValue(event.target.value);
              comboBox.openDropdown();
              comboBox.updateSelectedOptionIndex();
            }}
            onClick={() => comboBox.openDropdown()}
            onFocus={() => comboBox.openDropdown()}
            onBlur={() => comboBox.closeDropdown()}
            rightSection={
              <button
                className="hover:scale-125 hover:fill-white transition-all"
                onClick={() => {
                  setInputValue("");
                  filterStore.setInvestigatorFilter(null);
                }}
              >
                <X width={20} />
              </button>
            }
          />
        </Combobox.Target>
        <Combobox.Dropdown className="max-h-80 overflow-auto">
          {Object.entries(getInvestigatorData()).map(([faction, investigators]) => {
            const factionEnum = Faction[faction as keyof typeof Faction];
            return (
              <Combobox.Group
                key={faction}
                label={faction}
                style={{ backgroundColor: darken(FactionColors[factionEnum], 0.2) }}
                className="text-white"
              >
                {investigators.map((investigator) => {
                  if (!investigator.name.toLowerCase().includes(inputValue.toLowerCase())) {
                    return;
                  }

                  return (
                    <Combobox.Option
                      className="flex truncate items-center"
                      value={investigator.code}
                      key={investigator.code}
                    >
                      <p>{investigator.name}</p>
                      <p className="mx-1">-</p>
                      <p className={`text-xs ${getTextColor(faction)}`}>{investigator.pack_name}</p>
                    </Combobox.Option>
                  );
                })}
              </Combobox.Group>
            );
          })}
        </Combobox.Dropdown>
      </Combobox>
      {filterStore.investigatorFilter && (
        <div className="flex flex-col">
          <AspectRatio
            ratio={7 / 5}
            onClick={() => handlers.open()}
            className="cursor-pointer my-2"
          >
            <Image src={`https://arkhamdb.com${filterStore.investigatorFilter?.imagesrc}`} />
          </AspectRatio>
        </div>
      )}

      {filterStore.investigatorFilter && (
        <Modal.Root
          opened={opened}
          onClose={handlers.close}
          closeOnClickOutside={true}
          centered
          size={"auto"}
          className="container"
          transitionProps={{ transition: enterTransition }}
          classNames={{
            content: "bg-transparent",
          }}
        >
          <Modal.Overlay backgroundOpacity={0.9} blur={5}></Modal.Overlay>
          <Modal.Content>
            <Modal.Body>
              <div className={`overflow-hidden`}>
                <div className="grid grid-cols-[500px,auto,500px] h-[50vh]">
                  <div onClick={(e) => onBackgroundClicked(e, handlers.close)}></div>
                  <div className="w-full h-full flex flex-col">
                    <AspectRatio ratio={7 / 5} className="h-full w-full flex-1">
                      <FlipCard
                        frontImage={`https://arkhamdb.com${filterStore.investigatorFilter.imagesrc}`}
                        backImage={`https://arkhamdb.com${filterStore.investigatorFilter.backimagesrc}`}
                      />
                    </AspectRatio>
                  </div>

                  <div
                    className="flex flex-col justify-between p-10 overflow-auto"
                    onClick={(e) => onBackgroundClicked(e, handlers.close)}
                  >
                    <div>
                      <h2 className="text-center text-5xl">
                        {filterStore.investigatorFilter.name}
                      </h2>
                      <p className="text-center font-bold text-2xl">
                        {filterStore.investigatorFilter.type_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-center text-2xl font-bold">
                        {filterStore.investigatorFilter.traits}
                      </p>
                      <p className="text-center text-2xl pt-8">
                        {filterStore.investigatorFilter.text
                          ? parseHTML(parseCardText(filterStore.investigatorFilter.text))
                          : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-center italic">{filterStore.investigatorFilter.flavor}</p>
                      <p className="text-center font-bold">
                        {filterStore.investigatorFilter.pack_name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
      )}
    </div>
  );
};

export default InvestigatorFilter;
