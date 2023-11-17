import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export const useServerSession = async () => {
  const data: any = await getServerSession(authOptions);
  return data;
};
