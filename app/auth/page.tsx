"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Icons } from "@/components/custom/icons";

export default function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "";

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>select an account to continue</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 gap-6">
            <Button
              onClick={() => signIn("github", { callbackUrl })}
              variant="outline"
            >
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button
              onClick={() => signIn("google", { callbackUrl })}
              variant="outline"
            >
              <Icons.google className="mr-2 h-3 w-3" />
              Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
