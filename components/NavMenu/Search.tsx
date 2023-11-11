import { Input } from "@/components/ui/input";
import useUrlQuery from "@/lib/useUrlQuery";
import { useRouter } from "next/navigation";

export const Search = () => {
  const { value: event } = useUrlQuery("isEvent");
  const { value, genrateUrl } = useUrlQuery("search");
  const router = useRouter();

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    e.preventDefault();
    value.length > 3 && router.push(genrateUrl(value));
  };

  return (
    <Input
      id="search"
      placeholder={!event ? 'Search via "email"...' : 'Search via "event"...'}
      defaultValue={value ?? ""}
      // value={value ?? ""}
      onChange={onSearchChange}
      className="flex-1 m-2"
    />
  );
};
