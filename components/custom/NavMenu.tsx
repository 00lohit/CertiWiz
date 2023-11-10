import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "../NavMenu/Profile";
import { useRouter } from "next/navigation";
import { Search } from "../NavMenu/Search";

export default function NavMenu() {
  const pathname = usePathname();
  let { data } = useSession();

  return (
    pathname !== "/auth" && (
      <div>
        <div className="p-2 px-4 flex justify-between items-center">
          <div className="flex flex-row items-center justify-center">
            <h1 className="font-bold text-3xl">CertiWiz</h1>
          </div>
          <ContentType {...{ pathname, data }} />
          <Search />
          <Profile data={data} />
        </div>
        <hr />
      </div>
    )
  );
}

interface ContentType {
  data: {} | null;
  pathname: string | null;
}

const ContentType = ({ pathname, data }: ContentType) => {
  const router = useRouter();
  let links = [
    { name: "All", link: "/" },
    { name: "Your", link: "/your" },
  ];

  let type = [
    { name: "Certificate", link: "/certificate" },
    { name: "Event", link: "/event" },
  ];

  return (
    <nav className={"flex items-center"}>
      {data && (
        <Tabs defaultValue={pathname ?? "/"} className="m-2">
          <TabsList className="grid grid-cols-2">
            {links.map(({ name, link }) => (
              <TabsTrigger onClick={() => router.replace(link)} value={link}>
                {name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

      <Tabs defaultValue={pathname ?? "/"} className="m-2">
        <TabsList className="grid grid-cols-2">
          {type.map(({ name, link }) => (
            <TabsTrigger onClick={() => router.replace(link)} value={link}>
              {name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </nav>
  );
};
