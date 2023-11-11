import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "../NavMenu/Profile";
import { useRouter } from "next/navigation";
import { Search } from "../NavMenu/Search";
import { Add } from "../NavMenu/Add";

export default function NavMenu() {
  const pathname = usePathname();
  let { data } = useSession();

  return (
    pathname !== "/auth" && (
      <div>
        <div className="p-2 px-4 flex justify-between items-center">
          <div className="flex flex-row items-center justify-center mr-2">
            <h1 className="font-bold text-3xl">CertiWiz</h1>
          </div>
          <div className="flex-1 hidden lg:block">
            <Contnet {...{ pathname, data }} />
          </div>
          <Profile data={data} />
        </div>
        <div className="p-2 flex justify-between items-center lg:hidden">
          <Contnet {...{ pathname, data }} />
        </div>
        <hr />
      </div>
    )
  );
}

const Contnet = ({ pathname, data }: ContentType) => {
  return (
    <div className="flex flex-1 items-center">
      <ContentType {...{ pathname, data }} />
      <Search />
      <Add />
    </div>
  );
};

export interface ContentType {
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
