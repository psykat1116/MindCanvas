"use client";
import { useEffect, useState } from "react";
import SettingModal from "@/components/modal/SettingModal";
import CoverImageModal from "@/components/modal/CoverImageModal";

const ModelProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <SettingModal />
      <CoverImageModal />
    </>
  );
};

export default ModelProvider;
