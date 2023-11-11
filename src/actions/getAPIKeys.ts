import { db } from "@/lib/db";

const getAPIKeys = async (user: any) => {
  const apiKey = await db.apiKey.findFirst({
    where: { userId: user.user.id, enabled: true },
  });
  return apiKey;
};
export default getAPIKeys;
