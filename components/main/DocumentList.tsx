"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Item from "./Item";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}

const DocumentList: React.FC<DocumentListProps> = ({
  parentDocumentId,
  level = 0,
  data,
}) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Expand or collapse document
  const onExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Fetch documents
  const documents = useQuery(api.document.getSidebar, {
    parentDocument: parentDocumentId,
  });

  // Redirect to document
  const onRedirect = (id: string) => {
    router.push(`/documents/${id}`);
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <div>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : "25px" }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          level === 0 && "hidden",
          expanded && "last:block"
        )}
      >
        {level !== 0 && "No Pages Inside"}
      </p>
      {documents.map((doc) => (
        <div className="" key={doc._id}>
          <Item
            id={doc._id}
            onClick={() => onRedirect(doc._id)}
            icon={FileIcon}
            label={doc.title}
            level={level}
            expanded={expanded[doc._id]}
            onExpand={() => onExpand(doc._id)}
            documentIcon={doc.icon}
            active={params.documentId === doc._id}
          />
          {expanded[doc._id] && (
            <DocumentList parentDocumentId={doc._id} level={level + 1} />
          )}
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
