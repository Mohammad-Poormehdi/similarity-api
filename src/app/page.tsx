import Image from "next/image";
import Paragraph from "@/components/ui/Paragraph";
import type { Metadata } from "next";
import LargeHeading from "@/components/ui/LargeHeading";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Similartiy API | Home",
  description: "Free and open-source similarity API",
};

export default function Home() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-x-hidden">
      <div className="container pt-32 max-w-7xl mx-auto w-full h-full">
        <div className="h-full gap-6 flex flex-col justify-center items-center">
          <LargeHeading
            size={"lg"}
            className="three-d text-center text-black dark:text-slate-100"
          >
            Easily determine <br /> text similarity
          </LargeHeading>
          <Paragraph className="max-w-xl ">
            With the text similarity API, you can easily determine the
            similarity between two pieces of text with a free{" "}
            <Link href="/login" className="underline underline-offset-2 ">
              API key
            </Link>
          </Paragraph>
          <div className="relative w-full max-w-lg lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute"></div>
        </div>
      </div>
    </div>
  );
}
