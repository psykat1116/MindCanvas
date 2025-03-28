"use client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { useMediaQuery } from "usehooks-ts";
import { api } from "@/convex/_generated/api";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  AlignLeft,
  ChevronsLeft,
  Plus,
  PlusCircle,
  Search,
  Settings,
  Trash,
} from "lucide-react";

import Item from "@/components/main/Item";
import { useTrash } from "@/hooks/useTrash";
import { useSearch } from "@/hooks/useSearch";
import { useSettings } from "@/hooks/useSettings";
import UserItem from "@/components/main/UserItem";
import DocumentList from "@/components/main/DocumentList";
import MainNavbar from "@/components/documents/MainNavbar";

const Navigation = () => {
  const router = useRouter();
  const { onOpen } = useSearch();
  const { onOpen: onOpenSettings } = useSettings();
  const { onOpen: onOpenTrash } = useTrash();
  const pathname = usePathname();
  const params = useParams();
  const isMobile = useMediaQuery("(max-width: 748px)");
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isReseting, setIsReseting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const create = useMutation(api.document.create);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  // Resize sidebar
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Handle mouse move
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = e.clientX;

    if (newWidth < 260) newWidth = 260;
    if (newWidth > 520) newWidth = 520;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  // Handle mouse up
  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // Reset sidebar width
  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsReseting(true);
      sidebarRef.current.style.width = isMobile ? "100%" : "260px";
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "260px");
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 260px)"
      );
      setTimeout(() => {
        setIsReseting(false);
      }, 300);
    }
  };

  // Collapse sidebar
  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsReseting(true);
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("left", "0");
      navbarRef.current.style.setProperty("width", "100%");
      setTimeout(() => {
        setIsReseting(false);
      }, 300);
    }
  };

  // Create a new document
  const handleCreate = async () => {
    const promise = create({ title: "Untitled" }).then((documentId) => {
      router.push(`/documents/${documentId}`);
    });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "Note created successfully",
      error: "Failed to create a new note",
    });
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isReseting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
          onClick={collapse}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <p className="min-h-[27px] text-md p-3 w-full bg-primary/5 flex items-center font-bold border-b">
            MindCanvas
          </p>
          <UserItem />
          <Item onClick={onOpen} label="Search" icon={Search} isSearch />
          <Item onClick={onOpenSettings} label="Settings" icon={Settings} />
          <Item onClick={onOpenTrash} label="Trash" icon={Trash} />
          <Item onClick={handleCreate} label="New Page" icon={PlusCircle} />
        </div>
        <div className="mt-4">
          <DocumentList />
          <Item onClick={handleCreate} icon={Plus} label="Add A Page" />
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isReseting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!params.documentId ? (
          <MainNavbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
        ) : (
          <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && (
              <AlignLeft
                className="h-6 w-6 text-muted-foreground"
                role="button"
                onClick={resetWidth}
              />
            )}
          </nav>
        )}
      </div>
    </>
  );
};

export default Navigation;
