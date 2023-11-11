import authOptions from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

const getUser = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};
export default getUser;
