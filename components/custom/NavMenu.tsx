import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

export default function NavMenu() {
  const router = useRouter();

  let { data } = useSession();
  let { name, email, image } = data?.user ?? {};

  return (
    <div>
      <div>
        <Avatar>
          <AvatarImage src={image ?? ""} alt="@shadcn" />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <p>{name}</p>
      </div>
      <button onClick={() => signOut()}>Sign Out</button>
      <button onClick={() => router.push("/auth")}>Sign In</button>
      <hr className="my-4" />
    </div>
  );
}
