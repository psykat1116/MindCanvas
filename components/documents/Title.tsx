"use client";
import { useRef, useState } from "react";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Doc } from "@/convex/_generated/dataModel";

interface TitleProps {
  initialData: Doc<"documents">;
}

const Title = ({ initialData }: TitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(initialData.title);
  const [isEditing, setIsEditing] = useState(false);
  const update = useMutation(api.document.update);

  // Enable input for editing
  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  // Disable input after editing
  const disableInput = () => {
    setIsEditing(false);
  };

  // Update title on enter key press
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      disableInput();
      update({
        id: initialData._id,
        title: title || "Untitled",
      });
    }
  };

  return (
    <div className="flex items-center gap-x-1">
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={onKeyDown}
          value={title}
          className="h-7 px-2 focus-visible:ring-transparent bg-transparent"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="sm"
          className="font-normal h-auto p-1"
        >
          <span className="truncate">{initialData?.title}</span>
        </Button>
      )}
    </div>
  );
};

Title.displayName = "Title";

Title.Skeleton = () => {
  return <Skeleton className="h-3 w-16 rounded-md" />;
};

export default Title;
