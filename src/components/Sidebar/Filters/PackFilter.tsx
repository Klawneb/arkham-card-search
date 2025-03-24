import { useQuery } from "@tanstack/react-query";
import { Pack } from "../../types/api";
import { useFilterStore } from "../../lib/filter";
import { Accordion, Checkbox, Divider } from "@mantine/core";

async function fetchPacks(): Promise<Pack[]> {
  const response = await fetch("https://arkhamdb.com/api/public/packs/");
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

function getBasePacks(packs: Pack[]) {
  return packs.filter((pack) => pack.position === 1);
}

function getCyclePacks(packs: Pack[], cyclePosition: number) {
  return packs.filter((packs) => packs.cycle_position === cyclePosition);
}

function fixBasePackName(pack: Pack) {
  if (pack.name.includes("Investigator Expansion")) {
    return pack.name.replace("Investigator Expansion", "");
  }

  if (pack.cycle_position === 50) {
    return "Return to";
  }

  if (pack.cycle_position === 60) {
    return "Investigator Starter Decks";
  }

  if (pack.cycle_position === 70) {
    return "Standalone Adventures";
  }

  if (pack.cycle_position === 90) {
    return "Challenge Scenarios";
  }

  return pack.name;
}

const PackFilter = () => {
  const packs = useQuery({
    queryKey: ["packs"],
    queryFn: fetchPacks,
  });
  const filterStore = useFilterStore();

  function handleSubPackClick(pack: Pack) {
    if (isSubPackEnabled(pack)) {
      filterStore.setPackFilter(filterStore.packFilter.filter((p) => p != pack.code));
      return;
    }

    filterStore.setPackFilter([...filterStore.packFilter, pack.code]);
  }

  function isSubPackEnabled(pack: Pack) {
    return filterStore.packFilter.includes(pack.code);
  }

  function handleBasePackClick(pack: Pack) {
    const subPacks = getCyclePacks(packs.data ?? [], pack.cycle_position);
    const subPackCodes = subPacks.map((pack) => pack.code);

    if (isBasePackEnabled(pack)) {
      filterStore.setPackFilter(
        filterStore.packFilter.filter((code) => !subPackCodes.includes(code))
      );
      return;
    }

    filterStore.setPackFilter([...filterStore.packFilter, ...subPackCodes]);
  }

  function isBasePackEnabled(pack: Pack) {
    const subPacks = getCyclePacks(packs.data ?? [], pack.cycle_position);

    return subPacks.every((subPack) => filterStore.packFilter.includes(subPack.code));
  }

  if (!packs.data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-[400px] overflow-auto">
      <Accordion multiple={true}>
        {getBasePacks(packs.data)
          .sort((a, b) => a.cycle_position - b.cycle_position)
          .map((pack) => {
            return (
              <Accordion.Item value={pack.name} key={pack.id}>
                <Accordion.Control className="p-0" classNames={{ label: "p-1" }}>
                  <div className="flex items-center">
                    <div onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={isBasePackEnabled(pack)}
                        onChange={() => {
                          handleBasePackClick(pack);
                        }}
                      />
                    </div>
                    <p className="pl-2">{fixBasePackName(pack)}</p>
                  </div>
                </Accordion.Control>
                <Accordion.Panel classNames={{ content: "p-0" }}>
                  <Divider />
                  <div className="w-full">
                    {getCyclePacks(packs.data, pack.cycle_position).map((pack, index) => {
                      return (
                        <div
                          key={pack.code}
                          className={`flex items-center p-1 ${index % 2 === 0 ? "bg-[#332f2d]" : ""}`}
                        >
                          <Checkbox
                            className="ml-6"
                            checked={isSubPackEnabled(pack)}
                            onChange={() => handleSubPackClick(pack)}
                          />
                          <p className="pl-2 pt-1">{pack.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            );
          })}
      </Accordion>
    </div>
  );
};

export default PackFilter;
