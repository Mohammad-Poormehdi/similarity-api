import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toast";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import Modal from "@/components/modals/Modal";
import ModalProvider from "@/providers/ModalProvider";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen bg-slate-50 dark:bg-slate-900 antialiased ${inter.className}`}
      >
        <Providers>
          <Navbar />
          {children}
          <Toaster position="bottom-right" />
        </Providers>
        {/* Allow for more height on mobile devices */}
        <div className="h-40 md:hidden" />
      </body>
    </html>
  );
}
