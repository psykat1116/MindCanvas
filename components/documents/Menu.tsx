"use client";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { Ellipsis, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuProps {
  documentId: Id<"documents">;
}

const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter();
  const { user } = useUser();
  const archive = useMutation(api.document.archive);

  // Archive document
  const onArchive = () => {
    const promise = archive({ id: documentId });
    toast.promise(promise, {
      loading: "Archiving document...",
      success: "Document Archived",
      error: "Failed to archive document",
    });
    router.push("/documents");
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Ellipsis className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-70"
        align="end"
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem onClick={onArchive}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by <strong>{user?.fullName}</strong>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.displayName = "Menu";

Menu.Skeleton = () => {
  return <Skeleton className="h-10 w-10" />;
};

export default Menu;
