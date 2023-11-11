import getAPIKeys from "@/actions/getAPIKeys";
import getUser from "@/actions/getUser";
import ApiDashboard from "@/components/ApiDashboard";
import RequestApiKey from "@/components/RequestApiKey";
import { authOptions } from "@/lib/auth";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Similarity API | Dashboard",
  description:
    "Similartiy API Dashboard for managing your API keys and your API requests",
};

const Dashboard = async () => {
  //   const user = await getServerSession(authOptions);

  //   const apiKey = await getAPIKeys(user);
  //   console.log(apiKey);

  const user = await getUser();
  console.log(user);

  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div className="max-w-7xl mx-auto mt-16">
      <RequestApiKey />
    </div>
  );
};
export default Dashboard;
