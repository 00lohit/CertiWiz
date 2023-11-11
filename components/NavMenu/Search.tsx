import { Input } from "@/components/ui/input";

export const Search = () => {
  return (
    <Input
      id="search"
      placeholder="Search..."
      defaultValue=""
      className="flex-1 m-2"
    />
  );
};
