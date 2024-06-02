"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.document.create);

  const onCreate = async () => {
    const promise = create({ title: "Untitled" }).then((documentId) => {
      router.push(`/documents/${documentId}`);
    });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "Note created successfully",
      error: "Failed to create a new note",
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center spac-y-4">
      <Image
        src="/EmptyDark.png"
        height={300}
        width={300}
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/EmptyLight.png"
        height={400}
        width={400}
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium text-center">
        Welcome to {user?.firstName}&apos;s MindCanvas
      </h2>
      <Button className="mt-3" onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default Page;
