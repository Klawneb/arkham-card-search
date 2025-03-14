import { Autocomplete, AutocompleteProps, ComboboxItem, OptionsFilter } from "@mantine/core";
import { Card, FactionColors, Type } from "../types/api";
import fuzzysort from "fuzzysort";
import { darkenHexColor } from "../lib/colors";
import { useState } from "react";

interface InvestigatorFilterProps {
  cards: Card[];
}

function fixExpansionName(name: string) {
  let newName = name;

  if (name.includes("Investigator Expansion")) {
    newName = name.replace("Investigator Expansion", "");
  }

  return newName;
}

const InvestigatorFilter = ({ cards }: InvestigatorFilterProps) => {
  const [selectedInvestigator, setSelectedInvestigator] = useState("");

  function getAutocompleteData(cards: Card[]) {
    const investigatorMap = new Map<string, Array<{ value: string; label: string }>>();

    cards.forEach((card) => {
      if (!(card.type_code === Type.Investigator)) {
        return;
      }

      if (!investigatorMap.has(card.faction_name)) {
        investigatorMap.set(card.faction_name, []);
      }
      investigatorMap.get(card.faction_name)?.push({
        value: card.code,
        label: card.name,
      });
    });

    const groups: { group: string; items: Array<{ value: string; label: string }> }[] = [];
    investigatorMap.forEach((items, group) => {
      groups.push({ group, items });
    });
    return groups;
  }
  function getInvestigatorByCode(cards: Card[], code: string) {
    return cards.find((card) => card.code === code);
  }

  const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({ option }) => {
    const investigator = getInvestigatorByCode(cards, option.value);
    return (
      <div className={`w-full px-1 rounded-md flex`}>
        <p>{investigator?.name} </p>
        <p className="mx-1">-</p>
        <p className="text-stone-500">{fixExpansionName(investigator?.pack_name ?? "")}</p>
      </div>
    );
  };

  const optionsFilter: OptionsFilter = ({ options, search }) => {
    if (!search) return options;

    const typedOptions = options as { group: string; items: ComboboxItem[] }[];

    return typedOptions
      .map((group) => {
        const filteredItems = group.items
          .map((item) => {
            const result = fuzzysort.single(
              search.toLowerCase(),
              item.label.toLowerCase() + getInvestigatorByCode(cards, item.value)?.pack_name
            );
            return result ? { ...item, score: result.score } : null;
          })
          .filter((item) => item !== null && item.score > 0.75)
          .sort((a, b) => (a!.score ?? 0) - (b!.score ?? 0));

        return {
          group: group.group,
          items: filteredItems as ComboboxItem[],
        };
      })
      .filter((group) => group.items.length > 0);
  };

  return (
    <div className="m-2">
      <Autocomplete
        clearable
        placeholder="Investigator name"
        data={getAutocompleteData(cards)}
        renderOption={renderAutocompleteOption}
        filter={optionsFilter}
      >
        
      </Autocomplete>
    </div>
  );
};

export default InvestigatorFilter;
