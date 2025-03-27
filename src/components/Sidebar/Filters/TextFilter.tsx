import { SegmentedControl, TextInput } from "@mantine/core";
import { useFilterStore } from "../../../lib/filter.ts";
import { X } from "lucide-react";

const TextFilter = () => {
  const filterStore = useFilterStore();

  const handleSegmentChange = (value: string) => {
    filterStore.setTextFilterType(value);
  };

  return (
    <div className="p-2 flex flex-col gap-3">
      <TextInput
        value={filterStore.textFilter}
        onChange={(e) => filterStore.setTextFilter(e.target.value)}
        placeholder="Filter cards"
        radius="md"
        size="sm"
        classNames={{
          input: "bg-stone-900 text-stone-300 border-stone-600",
        }}
        rightSection={
          <X
            onClick={() => filterStore.setTextFilter("")}
            className="hover:scale-125 cursor-pointer transition-transform hover:text-red-400"
          />
        }
      />
      <SegmentedControl
        data={[
          { label: "All Cards", value: "all" },
          { label: "Titles Only", value: "titles" },
          { label: "Text Only", value: "text" },
        ]}
        value={filterStore.textFilterType}
        onChange={handleSegmentChange}
        size="xs"
        classNames={{
          root: "bg-stone-900",
        }}
        color="teal"
      />
    </div>
  );
};

export default TextFilter;
