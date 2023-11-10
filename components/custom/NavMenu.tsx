import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavMenu() {
  const router = useRouter();

  let { data } = useSession();
  let { name, email, image } = data?.user ?? {};

  return (
    <div>
      <div className="p-2 px-4 flex justify-between items-center">
        <h1 className="font-bold text text-3xl">CertiWiz </h1>
        <div>
          {data ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src={image ?? ""} alt="@shadcn" />
                    <AvatarFallback>{name}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2">
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              className="my-1"
              variant={"outline"}
              onClick={() => router.push("/auth")}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
}
