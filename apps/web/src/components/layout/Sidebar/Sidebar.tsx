"use client";
import { useSidebar } from "@/context/SideBarContext";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import SidebarNav from "@/components/layout/Sidebar/SidebarNav/SidebarNav";
import SidebarSort from "@/components/layout/Sidebar/SidebarSort/SidebarSort";

export default function Sidebar(): ReactNode {
  const { isOpen } = useSidebar();
  return (
    <div
      className={cn(
        "h-full overflow-hidden border-r border-(--sidebar-border-color) bg-(--sidebar-bg) transition-all duration-200",
        isOpen ? "w-60" : "w-0",
      )}
    >
      <div className="flex w-60 flex-col">
        <SidebarNav />
        <hr className="my-8 border-t border-(--sidebar-spacer-color)" />
        <SidebarSort />
        <hr className="my-8 border-t border-(--sidebar-spacer-color)" />
      </div>
    </div>
  );
}
