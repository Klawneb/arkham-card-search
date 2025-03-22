import { RangeSlider } from "@mantine/core";
import { useFilterStore } from "../../lib/filter";

const marks = [
  { value: -2, label: "X" },
  { value: 0, label: "0" },
  { value: 2, label: "2" },
  { value: 4, label: "4" },
  { value: 6, label: "6" },
  { value: 8, label: "8" },
  { value: 10, label: "10" },
  { value: 12, label: "12" },
];
const ResourceFilter = () => {
  const filterStore = useFilterStore();

  function getLabel(value: number) {
    if (value === -2) {
      return "X";
    }
    return value.toString();
  }

  function handleSliderChange(value: [number, number]) {
    if (value[0] === -1) value[0] = 0;
    if (value[1] === -1) value[1] = 0;
    filterStore.setResourceFilter(value);
  }

  return (
    <div className="p-6">
      <RangeSlider
        color="stone.4"
        marks={marks}
        min={-2}
        max={12}
        minRange={0}
        step={1}
        label={(value) => getLabel(value)}
        value={filterStore.resourceFilter}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default ResourceFilter;
