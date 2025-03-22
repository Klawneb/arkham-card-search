import { SearchIcon } from "lucide-react";
import { useBackgroundColor } from "../../lib/colors";
import { useFilterStore } from "../../lib/filter";
import { Card } from "../../types/api";
import { Autocomplete, Text } from "@mantine/core";
import { useState } from "react";

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
  const bgColor = useBackgroundColor("bg-[#332f2d]", "bg-[#d9d9d9]");

  return (
    <div className="p-2">
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
        leftSection={<SearchIcon className="w-5 h-5 text-stone-300" />}
        radius="md"
        size="md"
        classNames={{
          input: "bg-stone-800 text-stone-100 border-stone-600",
        }}
      />
      <div className="grid grid-cols-2 gap-2 pt-2">
        {filterStore.traitFilter.map((trait) => {
          return (
            <div
              key={trait}
              onClick={() => removeSelectedTrait(trait)}
              className={`${bgColor} rounded-3xl border-stone-500 border-2 transition-all px-1 py-0.5 text-sm flex items-center`}
            >
              <Text className="flex-1 text-center block truncate font-semibold">{trait}</Text>
              <button className="w-5 absolute hover:scale-125 stroke-stone-400 hover:stroke-red-500 transition-all">
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
