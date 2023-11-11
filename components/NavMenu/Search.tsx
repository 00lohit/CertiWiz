import { Input } from "@/components/ui/input";
import useDebounce from "@/lib/useDebounce";
import useUrlQuery from "@/lib/useUrlQuery";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Search = () => {
  const pathname = usePathname();
  let isEvent = pathname == "/events";

  const { value, genrateUrl } = useUrlQuery("search");
  const router = useRouter();

  const [search, setSearch] = useState(value ?? "");
  const debouncedValue = useDebounce(search, 690);

  useEffect(() => {
    router.push(genrateUrl(search));
    return () => {};
  }, [debouncedValue]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    e.preventDefault();
    setSearch(value);
  };

  return (
    <Input
      id="search"
      placeholder={!isEvent ? 'Search via "email"...' : 'Search via "event"...'}
      defaultValue={value ?? ""}
      value={search}
      onChange={onSearchChange}
      className="flex-1 m-2"
    />
  );
};
