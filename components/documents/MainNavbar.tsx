"use client";
import { useQuery } from "convex/react";
import { AlignLeft } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { useParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import Menu from "@/components/documents/Menu";
import Title from "@/components/documents/Title";
import { Id } from "@/convex/_generated/dataModel";
import Banner from "@/components/documents/Banner";
import Publish from "@/components/documents/Publish";

interface MainNavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

const MainNavbar: React.FC<MainNavbarProps> = ({
  isCollapsed,
  onResetWidth,
}) => {
  const params = useParams();
  const isMobile = useMediaQuery("(max-width: 748px)");
  const document = useQuery(api.document.getById, {
    id: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-dark px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav
        className={cn(
          "bg-background dark:bg-dark px-3 py-2 w-full flex items-center gap-x-4",
          !isCollapsed && isMobile && "hidden"
        )}
      >
        {isCollapsed && (
          <AlignLeft
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
          <div className="flex items-center gap-x-2">
            <Publish initialData={document} />
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};

export default MainNavbar;
