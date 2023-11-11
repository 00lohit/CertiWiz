import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ContentType } from "../Content";
import { useCallback } from "react";
import useUrlQuery from "@/lib/useUrlQuery";

const Type = ({ pathname, data }: ContentType) => {
  const router = useRouter();
  const { genrateUrl, value } = useUrlQuery("isEvent");

  let type = [
    { name: "Certificate", link: "" },
    { name: "Event", link: "true" },
  ];

  return (
    <Tabs defaultValue={value ?? ""} className="m-2">
      <TabsList className="grid grid-cols-2">
        {type.map(({ name, link }) => (
          <TabsTrigger
            onClick={() => router.push(genrateUrl(link))}
            value={link}
          >
            {name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default Type;
