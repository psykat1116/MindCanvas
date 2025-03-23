"use client";
import { toast } from "sonner";
import React, { useState } from "react";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react"
;
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { useOrigin } from "@/hooks/useOrigin";
import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";

interface PublishProps {
  initialData: Doc<"documents">;
}

const Publish: React.FC<PublishProps> = ({ initialData }) => {
  const origin = useOrigin();
  const update = useMutation(api.document.update);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  // Publish Note
  const onPublish = async () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Note Published",
      error: "Failed to Publish Note",
    });
  };

  // Unpublish Note
  const onUnpublish = async () => {
    setIsSubmitting(true);
    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Note Unpublished",
      error: "Failed to Unpublish Note",
    });
  };

  // Copy URL to clipboard
  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button size="sm" variant="ghost">
          Publish
          {initialData.isPublished && (
            <Globe className="text-sky-500 w-4 h-4 ml-2" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="text-sky-500 animate-pulse h-4 w-4" />
              <p className="text-xs font-medium text-sky-500">
                This Note is Live on the Web
              </p>
            </div>
            <div className="flex items-center w-full">
              <input
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              size="sm"
              className="w-full text-xs"
              disabled={isSubmitting}
              onClick={onUnpublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish This Note</p>
            <span className="text-xs text-muted-foreground mb-4">
              Share Your Work With Others
            </span>
            <Button
              className="w-full text-xs"
              size="sm"
              disabled={isSubmitting}
              onClick={onPublish}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
