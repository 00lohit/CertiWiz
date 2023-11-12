import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Session } from "next-auth";

export interface dataFormat {
  data: null | Session;
}

export default function Profile({ data }: dataFormat) {
  const router = useRouter();

  return (
    <div className="flex flex-row items-center justify-center ml-2">
      {!data ? (
        <Button variant={"outline"} onClick={() => router.push("/auth")}>
          Sign In
        </Button>
      ) : (
        <UserDetails data={data} />
      )}
    </div>
  );
}

const UserDetails = ({ data }: dataFormat) => {
  let { name, email, image } = data?.user ?? {};

  return (
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
  );
};
