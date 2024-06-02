import Navbar from "@/components/marketing/Navbar";
import React from "react";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-full dark:bg-dark">
      <Navbar />
      <main className="pt-40">{children}</main>
    </div>
  );
};

export default MarketingLayout;
