import Footer from "@/components/marketing/Footer";
import Heading from "@/components/marketing/Heading";
import Heroes from "@/components/marketing/Heroes";
import Image from "next/image";

const Page = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 p-6 pb-10">
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
