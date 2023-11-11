import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { ContentType } from "../Content";

const Acess = ({ pathname, data }: ContentType) => {
  const router = useRouter();
  let links = [
    { name: "All", link: "/" },
    { name: "Your", link: "/your" },
  ];

  return (
    data && (
      <Tabs defaultValue={pathname ?? "/"} className="m-2">
        <TabsList className="grid grid-cols-2">
          {links.map(({ name, link }) => (
            <TabsTrigger onClick={() => router.replace(link)} value={link}>
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    )
  );
};

export default Acess;
