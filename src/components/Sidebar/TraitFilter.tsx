import { useInputState, useSet } from "@mantine/hooks";
import { useFilterStore } from "../../lib/filter";
import { Card } from "../../types/api";
import { TextInput } from "@mantine/core";

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

  console.log(traitMap);

  return Array.from(traitMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map((pair) => pair[0]);
}

const TraitFilter = ({ cards }: TraitFilterProps) => {
  const filterStore = useFilterStore();
  const traits = getTraitList(cards);
  const [searchFilter, setSearchFilter] = useInputState("");

  const filteredTraits = traits.filter((trait) => trait.toLowerCase().includes(searchFilter.toLowerCase()));

  return (
    <div className="">
      <TextInput
        className="m-2"
        placeholder="Filter Traits"
        value={searchFilter}
        onChange={setSearchFilter}
      />
      {
        filteredTraits.length > 0 ?
        <div className="h-[300px] overflow-auto border-t-stone-700 border-t-[1px] border-separate">
        {filteredTraits.map((trait, index) => {
          return (
            <p
              className={`${
                index % 2 === 0 ? "bg-stone-800" : "bg-stone-700 bg-opacity-50"
              } p-1 hover:bg-stone-600 cursor-pointer transition-all duration-75`}
            >
              {trait}
            </p>
          );
        })}
      </div>
      :
      <p className="text-center p-2">No matching traits.</p>
      }
      
    </div>
  );
};

export default TraitFilter;
