import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { ContentType } from "../Content";
import useUrlQuery from "@/lib/useUrlQuery";

const Acess = ({ pathname, data }: ContentType) => {
  const router = useRouter();
  const { genrateUrl, value } = useUrlQuery("my");

  let type = [
    { name: "All", link: "" },
    { name: "Your", link: "true" },
  ];

  return (
    data && (
      <Tabs defaultValue={value ?? ""} className="m-2">
        <TabsList className="grid grid-cols-2">
          {type.map(({ name, link }, i) => (
            <TabsTrigger
              key={i.toString()}
              onClick={() => router.push(genrateUrl(link))}
              value={link}
            >
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    )
  );
};

export default Acess;
