import React from "react";
import Navbar from "@/components/marketing/Navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full dark:bg-dark">
      <Navbar />
      <main className="pt-40">{children}</main>
    </div>
  );
};

export default MarketingLayout;
