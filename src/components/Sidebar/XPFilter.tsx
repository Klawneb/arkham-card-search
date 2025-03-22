import { RangeSlider } from "@mantine/core";
import { useFilterStore } from "../../lib/filter";

const marks = [
  { value: 0, label: "0" },
  { value: 2, label: "2" },
  { value: 4, label: "4" },
  { value: 6, label: "6" },
  { value: 8, label: "8" },
  { value: 10, label: "10" },
];

const XPFilter = () => {
  const filterStore = useFilterStore();

  return (
    <div className="p-6">
      <RangeSlider
        color="stone.4"
        marks={marks}
        min={0}
        max={10}
        minRange={0}
        step={1}
        value={filterStore.xpFilter}
        onChange={filterStore.setxpFilter}
      />
    </div>
  );
};

export default XPFilter;
