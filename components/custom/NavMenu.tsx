import { usePathname } from "next/navigation";

import Profile from "../NavMenu/Profile";

import { Contnet } from "../NavMenu/Content";

export default function NavMenu({ data }: any) {
  const pathname = usePathname();

  const shouldRenderNavMenu = pathname == "/" || pathname == "/events";

  return (
    shouldRenderNavMenu && (
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
