import { Checkbox, TextInput } from "@mantine/core";
import { useFilterStore } from "../../lib/filter.ts";

const TextFilter = () => {
  const filterStore = useFilterStore();

  return (
    <div className="p-2">
      <TextInput
        value={filterStore.textFilter}
        onChange={(e) => filterStore.setTextFilter(e.target.value)}
      />
      <div className="flex pt-2 justify-between">
        <Checkbox
          label={"Titles only"}
          checked={filterStore.filterTitlesOnly}
          onChange={(e) => filterStore.setFilterTitlesOnly(e.target.checked)}
        />
        <Checkbox
          label={"Show all results"}
          checked={filterStore.showAllResults}
          onChange={(e) => filterStore.setShowAllResults(e.target.checked)}
        />
      </div>
    </div>
  );
};

export default TextFilter;
