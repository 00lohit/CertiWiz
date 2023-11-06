"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { log } from "console";

const ACTIVE_ROUTE = "py-1 px-2 text-gray-300 bg-gray-700";
const INACTIVE_ROUTE =
  "py-1 px-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700";

export default function NavMenu() {
  const pathname = usePathname();

  const { data: session } = useSession();

  console.log(session);

  return true ? (
    <div>
      <Avatar>
        <AvatarImage src={session?.user?.image ?? ""} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {session?.user?.name} <br />
      <button onClick={() => signOut()}>Sign out</button>
      <hr className="my-4" />
      <ul>
        <Link href="/">
          <li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
            Home
          </li>
        </Link>
        <Link href="/protected">
          <li
            className={
              pathname === "/protected" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Protected Route
          </li>
        </Link>
        <Link href="/serverAction">
          <li
            className={
              pathname === "/serverAction" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            Server Action
          </li>
        </Link>
        <Link href="/apiFromClient">
          <li
            className={
              pathname === "/apiFromClient" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            API From Client
          </li>
        </Link>
        <Link href="/apiFromServer">
          <li
            className={
              pathname === "/apiFromServer" ? ACTIVE_ROUTE : INACTIVE_ROUTE
            }
          >
            API From Server
          </li>
        </Link>
      </ul>
    </div>
  ) : (
    <></>
  );
}
