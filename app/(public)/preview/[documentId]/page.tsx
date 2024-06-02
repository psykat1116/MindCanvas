"use client";
import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import Toolbar from "@/components/documents/Toolbar";
import Cover from "@/components/documents/Cover";
import { Skeleton } from "@/components/ui/skeleton";

const Page = ({ params }: { params: { documentId: Id<"documents"> } }) => {
  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/documents/Editor"), { ssr: false }),
    []
  );
  const document = useQuery(api.document.getById, { id: params.documentId });
  const update = useMutation(api.document.update);

  const onChange = (content: string) => {
    update({ id: params.documentId, content });
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-1/2" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Document not found</div>;
  }

  return (
    <div className="pb-40">
      <Cover preview url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar preview initialData={document} />
        <Editor
          editable={false}
          initialContent={document.content}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default Page;
