import type { ReactNode } from "react";
import NavLink from "@/components/ui/NavLink/NavLink";
import {
  Bell,
  CalendarHeart,
  FolderTree,
  House,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  requiresAuth: boolean;
}

// TODO: Replace placeholder urls
const navItems: NavItem[] = [
  { label: "Start Page", href: "/", icon: House, requiresAuth: false },
  { label: "My Collections", href: "/", icon: CalendarHeart, requiresAuth: true },
  { label: "My Subscriptions", href: "/", icon: Bell, requiresAuth: true },
  { label: "Popular Collections", href: "/", icon: TrendingUp, requiresAuth: false },
  { label: "Browse Collections", href: "/", icon: FolderTree, requiresAuth: false },
];

// TODO: filter by requiresAuth when auth is implemented
export default function SidebarNav(): ReactNode {
  return (
    <nav className="mt-4 flex flex-col gap-(--spacing-icon-text)">
      {navItems.map((item) => (
        <NavLink key={item.label} href={item.href} className="mx-4">
          <item.icon /> {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
