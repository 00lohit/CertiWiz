import { usePathname, useRouter } from "next/navigation";

import Profile from "../NavMenu/Profile";

import { Contnet } from "../NavMenu/Content";

export default function NavMenu({ data }: any) {
  const pathname = usePathname();
  const router = useRouter();

  let showActions = !/^\/events\/[a-zA-Z0-9]+$/.test(pathname);

  const shouldRenderNavMenu =
    pathname == "/" || pathname == "/events" || !showActions;

  return (
    shouldRenderNavMenu && (
      <div>
        <div className="p-2 px-4 flex justify-between items-center">
          <div className="flex flex-row items-center justify-center mr-2">
            <h1
              onClick={() => router.push("/")}
              className="font-bold text-3xl cursor-default"
            >
              CertiWiz
            </h1>
          </div>
          <div className="flex-1 hidden lg:block">
            {showActions && <Contnet {...{ pathname, data }} />}
          </div>
          <Profile data={data} />
        </div>
        {showActions && (
          <div className="p-2 flex justify-between items-center lg:hidden">
            <Contnet {...{ pathname, data }} />
          </div>
        )}
        <hr />
      </div>
    )
  );
}
