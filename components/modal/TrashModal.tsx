"use client";
import React from "react";
import { toast } from "sonner";
import { File, Trash, Undo } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useTrash } from "@/hooks/useTrash";
import { api } from "@/convex/_generated/api";
import { Spinner } from "@/components/Spinner";
import { useEdgeStore } from "@/lib/edgestore";
import { Id } from "@/convex/_generated/dataModel";

const TrashModal = () => {
  const router = useRouter();
  const params = useParams();
  const { isOpen, onClose } = useTrash();
  const documents = useQuery(api.document.getTrash);
  const restore = useMutation(api.document.restore);
  const remove = useMutation(api.document.remove);
  const { edgestore } = useEdgeStore();

  // Redirect to document page
  const onClick = async (id: string) => {
    router.push(`/documents/${id}`);
  };

  // Restore document
  const onRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    e.stopPropagation();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring Note...",
      success: "Note Restored!",
      error: "Failed to restore Note",
    });
  };

  // Remove document
  const onRemove = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    e.stopPropagation();
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Deleting Note...",
      success: "Note Deleted!",
      error: "Failed to Delete Note",
    });

    const deletedData = documents?.find((doc) => doc._id === documentId);
    if (deletedData?.coverImage) {
      await edgestore.publicFiles.delete({ url: deletedData?.coverImage });
    }
    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={`Search Document In Trash...`} />
      <CommandList>
        <CommandEmpty>No Result Found</CommandEmpty>
        <CommandGroup heading="Documents">
          {documents?.map((doc) => (
            <CommandItem
              key={doc._id}
              role="button"
              value={`${doc._id}-${doc.title}`}
              title={doc.title}
              onClick={() => onClick(doc._id)}
              className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between cursor-pointer"
            >
              <span className="truncate pl-2 flex">
                {doc.icon ? (
                  <p className="mr-2 text-[18px]">{doc.icon}</p>
                ) : (
                  <File className="mr-2 h-4 w-4" />
                )}
                {doc.title}
              </span>
              <div className="flex items-center">
                <div
                  onClick={(e) => onRestore(e, doc._id)}
                  role="button"
                  className="rounded-sm p-1 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Undo className="h-4 w-4 text-muted-foreground" />
                </div>
                <div
                  onClick={(e) => onRemove(e, doc._id)}
                  role="button"
                  className="rounded-sm p-1 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default TrashModal;
