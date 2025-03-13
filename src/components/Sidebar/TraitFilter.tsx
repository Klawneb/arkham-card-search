import { useInputState, useSet } from "@mantine/hooks";
import { useFilterStore } from "../../lib/filter";
import { Card } from "../../types/api";
import { Autocomplete, Button, Chip, rem, TextInput, Tooltip } from "@mantine/core";
import { useState } from "react";
import { motion } from "framer-motion";

interface TraitFilterProps {
  cards: Card[];
}

function getTraitList(cards: Card[]): string[] {
  const traitMap = new Map<string, number>();

  cards.forEach((card) => {
    if (!card.traits) {
      return;
    }

    const traits = card.traits.split(".");
    traits.forEach((trait) => {
      const trimmedTrait = trait.trim();

      if (trimmedTrait == "") {
        return;
      }

      traitMap.set(trimmedTrait, (traitMap.get(trimmedTrait) ?? 0) + 1);
    });
  });

  return Array.from(traitMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map((pair) => pair[0]);
}

const TraitFilter = ({ cards }: TraitFilterProps) => {
  const filterStore = useFilterStore();
  const traits = getTraitList(cards);
  const [searchFilter, setSearchFilter] = useState("");

  function addSelectedTrait(trait: string) {
    filterStore.setTraitFilter([...filterStore.traitFilter, trait]);
  }

  function removeSelectedTrait(trait: string) {
    filterStore.setTraitFilter(filterStore.traitFilter.filter((t) => t !== trait));
  }

  function removeSelected(traits: string[]) {
    return traits.filter((trait) => !filterStore.traitFilter.includes(trait));
  }

  function filterSearch(traits: string[]) {
    return traits.filter((trait) => trait.toLowerCase().includes(searchFilter.toLowerCase()));
  }

  function filterTraits(traits: string[]) {
    let filtered = removeSelected(traits);
    filtered = filterSearch(filtered);
    return filtered;
  }

  const filteredTraits = filterTraits(traits);

  return (
    <div className="">
      <Autocomplete
        data={filteredTraits}
        value={searchFilter}
        onChange={(v) => {
          setSearchFilter(v);
        }}
        onOptionSubmit={(v) => {
          addSelectedTrait(v);
          setTimeout(() => setSearchFilter(""), 0);
        }}
        placeholder="Trait search"
        className="m-2"
      />
      <div className="grid grid-cols-2 gap-2 p-2">
        {filterStore.traitFilter.map((trait) => {
          return (
            <div
              onClick={() => removeSelectedTrait(trait)}
              className="bg-stone-700 rounded-xl transition-all p-2 text-sm flex items-center"
            >
              <p className="flex-1 text-center block truncate">{trait}</p>
              <button className="w-5 hover:scale-125 stroke-stone-400 hover:stroke-red-500 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TraitFilter;
