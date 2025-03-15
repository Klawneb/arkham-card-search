import {
  AspectRatio,
  Autocomplete,
  AutocompleteProps,
  Combobox,
  ComboboxItem,
  OptionsFilter,
  TextInput,
  useCombobox,
  Image,
  Modal,
} from "@mantine/core";
import { Card, Faction, FactionColors, Type } from "../types/api";
import { darkenHexColor } from "../lib/colors";
import { useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { X } from "lucide-react";

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

const InvestigatorFilter = ({ cards }: InvestigatorFilterProps) => {
  const comboBox = useCombobox({});
  const [inputValue, setInputValue] = useState("");
  const [selectedInvestigator, setSelectedInvestigator] = useState<Card | null>(null);
  const [opened, handlers] = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);

  function getInvestigatorByCode(code: string) {
    return cards.find((card) => card.code === code);
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
          setSelectedInvestigator(getInvestigatorByCode(value) ?? null);
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
                  setSelectedInvestigator(null);
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
                label={faction}
                style={{ backgroundColor: darkenHexColor(FactionColors[factionEnum], 20) }}
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
      {selectedInvestigator && (
        <div className="flex flex-col">
          <AspectRatio
            ratio={7 / 5}
            onClick={() => handlers.open()}
            className="cursor-pointer my-2"
          >
            <Image src={`https://arkhamdb.com${selectedInvestigator?.imagesrc}`} />
          </AspectRatio>
        </div>
      )}

      <Modal opened={opened} onClose={handlers.close}></Modal>
    </div>
  );
};

export default InvestigatorFilter;
