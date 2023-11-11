import { useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function useUrlQuery(name: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const value = searchParams.get(name);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  let genrateUrl = (value: string) =>
    pathname + (value.length > 0 ? "?" + createQueryString(name, value) : "");

  return { genrateUrl, value };
}
