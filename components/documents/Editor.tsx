"use client";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";

import { useEdgeStore } from "@/lib/edgestore";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

interface EditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
  editable?: boolean;
}

const Editor = ({ initialContent, onChange, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  // Handle File Upload
  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };

  // Create BlockNote Editor
  const editor = useCreateBlockNote({ uploadFile: handleUpload });

  useEffect(() => {
    const loadInitialData = async () => {
      if (initialContent) {
        const data = await editor.tryParseHTMLToBlocks(initialContent);
        editor.replaceBlocks(editor.document, data);
      }
    };
    loadInitialData();
  }, [editor]);

  // Handle Note Data Change Event
  const handleChange = async () => {
    const content = await editor.blocksToHTMLLossy(editor.document);
    onChange(content);
  };

  return (
    <BlockNoteView
      editor={editor}
      editable={editable}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      onChange={handleChange}
    />
  );
};

export default Editor;
