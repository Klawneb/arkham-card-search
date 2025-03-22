import React, { useRef, useState } from "react";
import { Combobox, TextInput } from "@mantine/core";
import { Card, Type, Faction, FactionColors } from "../../types/api";
import { useCombobox } from "@mantine/core";
import { darken } from "@mantine/core";
import { X } from "lucide-react";

interface InvestigatorComboboxProps {
  cards: Card[];
  onSelect: (investigator: Card | null) => void;
}

const InvestigatorCombobox: React.FC<InvestigatorComboboxProps> = ({ cards, onSelect }) => {
  const comboBox = useCombobox({});
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  function getInvestigatorByCode(code: string) {
    return cards.find((card) => card.code === code);
  }

  function getInvestigatorData() {
    const investigatorMap = new Map<string, Card[]>();

    cards.forEach((card) => {
      if (card.type_code !== Type.Investigator) {
        return;
      }

      if (!investigatorMap.has(card.faction_name)) {
        investigatorMap.set(card.faction_name, []);
      }

      investigatorMap.get(card.faction_name)?.push(card);
    });

    return Object.fromEntries(investigatorMap.entries());
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

  return (
    <Combobox
      store={comboBox}
      onOptionSubmit={(value) => {
        const investigator = getInvestigatorByCode(value);
        setInputValue(investigator?.name ?? "");
        onSelect(investigator ?? null);
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
          radius="md"
          size="md"
          classNames={{
            input: "bg-stone-800 text-stone-100 border-stone-600",
          }}
          onClick={() => comboBox.openDropdown()}
          onFocus={() => comboBox.openDropdown()}
          onBlur={() => comboBox.closeDropdown()}
          rightSection={
            <button
              className="hover:scale-125 hover:fill-white transition-all"
              onClick={() => {
                setInputValue("");
                onSelect(null);
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
                  return null;
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
  );
};

export default InvestigatorCombobox;
