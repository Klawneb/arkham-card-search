import {TextInput} from "@mantine/core";
import {useFilterStore} from "../../lib/filter.ts";

const TextFilter = () => {
    const filterStore = useFilterStore();

    return <div className={"p-2"}>
        <TextInput label={"Text Search"} value={filterStore.textFilter} onChange={(e) => filterStore.setTextFilter(e.target.value)}/>
    </div>
}

export default TextFilter;