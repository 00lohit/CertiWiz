import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NavMenu() {
  const router = useRouter();
  const pathname = usePathname();
  let { data } = useSession();
  let { name, email, image } = data?.user ?? {};

  return (
    pathname !== "/auth" && (
      <div>
        <div className="p-2 px-4 flex justify-between items-center">
          <div className="flex flex-row items-center justify-center">
            <h1 className="font-bold text text-3xl">CertiWiz</h1>
            <ContentType {...{ pathname, data }} />
          </div>

          <div className="flex flex-row items-center justify-center">
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
              <Button className="mb-1" onClick={() => router.push("/auth")}>
                Sign In
              </Button>
            )}
          </div>
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
  let links = [
    { name: "All", link: "/all" },
    { name: "Your", link: "/your" },
  ];

  return (
    <nav className={"flex items-center space-x-4 lg:space-x-6 mx-16"}>
      {links.map(({ name, link }) => (
        <Link
          href={link}
          className={cn(
            "text-sm font-medium transition-colors  hover:text-primary",
            pathname == link ? "text-primary text-md" : "text-muted-foreground"
          )}
        >
          {name}
        </Link>
      ))}
    </nav>
  );
};
