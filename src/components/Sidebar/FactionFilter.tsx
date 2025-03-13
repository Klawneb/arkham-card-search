import { Chip } from "@mantine/core";
import { darkenHexColor } from "../../lib/colors";
import { Faction, FactionColors } from "../../types/api";
import { useFilterStore } from "../../lib/filter";

const FactionFilter = () => {
  const filterStore = useFilterStore();

  return (
    <div className="flex flex-col p-2">
      <div className="grid grid-cols-3 grid-rows-2 gap-2">
        <Chip.Group
          multiple={true}
          value={filterStore.factionFilter}
          onChange={(value) => filterStore.setFactionFilter(value as Faction[])}
        >
          {Object.entries(FactionColors).map(([faction, color]) => {
            return (
              <Chip
                key={faction}
                value={faction}
                styles={{
                  iconWrapper: { display: "none" },
                  label: {
                    width: "100%",
                    justifyContent: "center",
                    backgroundColor: filterStore.factionFilter.includes(faction as Faction)
                      ? color
                      : darkenHexColor(color, 40),
                    border: `2px solid ${color}`,
                  },
                }}
              >
                {faction.slice(0, 1).toUpperCase() + faction.slice(1)}
              </Chip>
            );
          })}
        </Chip.Group>
      </div>
    </div>
  );
};

export default FactionFilter;
