"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { useEdgeStore } from "@/lib/edgestore";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/useCoverImage";
import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

const CoverImageModal = () => {
  const params = useParams();
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isOpen, onClose, url } = useCoverImage();
  const { edgestore } = useEdgeStore();
  const update = useMutation(api.document.update);

  // Handle File Upload
  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: url,
        },
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      setIsSubmitting(false);
      setFile(undefined);
      onClose();
    }
  };

  // Close Modal
  const onModalClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onModalClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <div>
          <SingleImageDropzone
            className="w-full outline-none"
            disabled={isSubmitting}
            value={file}
            onChange={onChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
