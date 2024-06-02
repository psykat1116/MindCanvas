"use client";
import React from "react";
import useScrollTop from "@/hooks/useScrollTop";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import ThemeToggle from "../ThemeToggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { Spinner } from "../Spinner";
import Link from "next/link";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scroll = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-dark fixed top-0 flex items-center w-full p-6",
        scroll && "shadow-sm borde-b"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant={"ghost"} size={"sm"}>
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size={"sm"}>Get MindCanvas For Free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <UserButton afterSignOutUrl="/" />
            <Button value={"ghost"} size={"sm"} asChild>
              <Link href="/documents">Enter MindCanvas</Link>
            </Button>
          </>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
