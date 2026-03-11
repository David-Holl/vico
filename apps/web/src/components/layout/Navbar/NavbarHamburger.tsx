"use client";
import { useSidebar } from "@/context/SideBarContext";
import { Menu } from "lucide-react";
import type { ReactNode } from "react";

export default function NavbarHamburger(): ReactNode {
  const { toggle } = useSidebar();
  return (
    <button aria-label="Toggle navigation" onClick={toggle}>
      <Menu />
    </button>
  );
}
