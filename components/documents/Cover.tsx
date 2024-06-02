"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { ImageIcon, X } from "lucide-react";
import { useCoverImage } from "@/hooks/useCoverImage";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { Skeleton } from "../ui/skeleton";

interface CoverProps {
  url?: string;
  preview?: boolean;
}

const Cover = ({ url, preview }: CoverProps) => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const { onReplace } = useCoverImage();
  const removeCoverImage = useMutation(api.document.removeCoverImage);

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({ url });
    }
    await removeCoverImage({ id: params.documentId as Id<"documents"> });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group",
        !url && "h-[12vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="cover" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 transition duration-500 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => onReplace(url)}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change Cover
          </Button>
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.displayName = "Cover";

Cover.Skeleton = () => {
  return (
    <div className="w-full h-[12vh]">
      <Skeleton />
    </div>
  );
};

export default Cover;
