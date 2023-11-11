import { useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function useUrlQuery(name: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const value = searchParams.get(name);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);

      if (value.length > 0) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      return params.toString();
    },
    [searchParams]
  );
  let genrateUrl = (value: string) =>
    pathname + "?" + createQueryString(name, value);

  return { genrateUrl, value };
}
