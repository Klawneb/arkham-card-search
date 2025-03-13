import { useQuery } from "@tanstack/react-query";
import { Pack } from "../../types/api";

async function fetchPacks(): Promise<Pack[]> {
  const response = await fetch("https://arkhamdb.com/api/public/packs/");
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

const PackFilter = () => {
  const packs = useQuery({
    queryKey: ["packs"],
    queryFn: fetchPacks,
  });

  return (
    <div>
      {packs.data?.map((pack) => {
        return <p>{pack.name}</p>;
      })}
    </div>
  );
};

export default PackFilter;
