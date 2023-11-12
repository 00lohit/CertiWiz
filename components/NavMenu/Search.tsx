import { Input } from "@/components/ui/input";
import useUrlQuery from "@/lib/useUrlQuery";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

export const Search = () => {
  const pathname = usePathname();
  let isEvent = pathname == "/events";
  const initialRender = useRef(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { value, genrateUrl } = useUrlQuery("search");
  const router = useRouter();

  const [search, setSearch] = useState(value ?? "");

  const [query] = useDebounce(search, 750);

  useEffect(() => {
    if (initialRender.current) {
      search.length > 0 && inputRef.current && inputRef.current.focus();
      initialRender.current = false;
      return;
    }
    router.push(genrateUrl(query));
  }, [query]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setSearch(value);
  };

  return (
    <Input
      id="search"
      ref={inputRef}
      placeholder={!isEvent ? 'Search via "email"...' : 'Search via "event"...'}
      // defaultValue={value ?? ""}
      value={search}
      onChange={onSearchChange}
      className="flex-1 m-2"
    />
  );
};
