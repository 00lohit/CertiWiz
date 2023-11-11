import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { ContentType } from "../Content";

const Type = ({ pathname, data }: ContentType) => {
  const router = useRouter();
  let links = [
    { name: "Certificate", link: "/" },
    { name: "Event", link: "/events" },
  ];

  return (
    <Tabs defaultValue={pathname ?? "/"} className="m-2">
      <TabsList className="grid grid-cols-2">
        {links.map(({ name, link }, i) => (
          <TabsTrigger
            key={i.toString()}
            onClick={() => router.replace(link)}
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
