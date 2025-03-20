import { Chip, darken, lighten, useMantineColorScheme } from "@mantine/core";
import { darkenHexColor, useBackgroundColor } from "../../lib/colors";
import { Type } from "../../types/api";
import { useFilterStore } from "../../lib/filter";

const TypeFilter = () => {
  const filterStore = useFilterStore();

  const theme = useMantineColorScheme();
  const color = useBackgroundColor("#8c8c8c", "#bababa");

  return (
    <div className="flex flex-col p-2">
      <div className="grid grid-cols-6 gap-2">
        <Chip.Group
          multiple={true}
          value={filterStore.typeFilter}
          onChange={(value) => filterStore.setTypeFilter(value as Type[])}
        >
          {Object.values(Type).map((type, index) => {
            return (
              <Chip
                className={`${
                  index === 6 ? "col-start-2 col-span-2 place-self-center w-full" : "col-span-2"
                }`}
                key={type}
                value={type}
                styles={{
                  iconWrapper: { display: "none" },
                  label: {
                    width: "100%",
                    justifyContent: "center",
                    backgroundColor: filterStore.typeFilter.includes(type as Type)
                      ? color
                      : theme.colorScheme === "dark" ? darken(color, 0.5) : lighten(color, 0.5),
                    border: `2px solid ${color}`,
                  },
                }}
              >
                {type.slice(0, 1).toUpperCase() + type.slice(1)}
              </Chip>
            );
          })}
        </Chip.Group>
      </div>
    </div>
  );
};

export default TypeFilter;
