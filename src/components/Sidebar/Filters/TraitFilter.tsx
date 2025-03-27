import { Autocomplete, Text } from "@mantine/core";
import { SearchIcon } from "lucide-react";
import { useContext, useState } from "react";
import { CardContext } from "../../../App";
import { useFilterStore } from "../../../lib/filter";
import { Card } from "../../../types/api";

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

const TraitFilter = () => {
  const filterStore = useFilterStore();
  const cards = useContext(CardContext);
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
        size="sm"
        classNames={{
          input: "bg-stone-900 text-stone-300 border-stone-600",
          dropdown: "bg-stone-800",
        }}
      />
      <div className="flex flex-wrap gap-2 py-2">
        {filterStore.traitFilter.map((trait) => {
          return (
            <div
              key={trait}
              onClick={() => removeSelectedTrait(trait)}
              className="relative bg-stone-700 rounded-md px-2 py-1 transition-all text-sm flex items-center pr-8"
            >
              <Text className="flex-1 text-center block truncate font-semibold">{trait}</Text>
              <button className="w-5 absolute right-1 hover:scale-125 stroke-stone-400 hover:stroke-red-500 transition-all">
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
