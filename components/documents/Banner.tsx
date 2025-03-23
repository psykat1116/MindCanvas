"use client";
import React from "react";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import ConfirmModal from "@/components/modal/ConfirmModal";

interface BannerProps {
  documentId: Id<"documents">;
}

const Banner: React.FC<BannerProps> = ({ documentId }) => {
  const router = useRouter();
  const remove = useMutation(api.document.remove);
  const restore = useMutation(api.document.restore);

  // Remove document
  const onRemove = () => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting document...",
      success: "Document Deleted",
      error: "Failed to Delete document",
    });
    router.push("/documents");
  };

  // Restore document
  const onRestore = () => {
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Document Restored",
      error: "Failed to Restored document",
    });
    router.push(`/documents/${documentId}`);
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This Page Is In The Trash</p>
      <Button
        size={"sm"}
        onClick={onRestore}
        variant={"outline"}
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore Page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size={"sm"}
          variant={"outline"}
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete Forever
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
