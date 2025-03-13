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
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);

  function addSelectedTrait(trait: string) {
    setSelectedTraits((prev) => [...prev, trait]);
  }

  function removeSelectedTrait(trait: string) {
    setSelectedTraits((prev) => prev.filter((t) => t !== trait));
  }

  function removeSelected(traits: string[]) {
    return traits.filter((trait) => !selectedTraits.includes(trait));
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
      <div className="grid grid-cols-3 gap-2 p-2">
        {selectedTraits.map((trait) => {
          return (
            <button
              onClick={() => removeSelectedTrait(trait)}
              className="bg-stone-700 rounded-xl hover:bg-red-800 transition-all py-1 text-sm"
            >
              {trait}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TraitFilter;
