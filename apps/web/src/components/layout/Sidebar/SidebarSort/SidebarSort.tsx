"use client";
import Button from "@/components/ui/Button/Button";
import NavLink from "@/components/ui/NavLink/NavLink";
import { cn } from "@/lib/utils";
import { ArrowDownAZ, ChevronDown, ChevronUp } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, type ReactNode } from "react";

interface SortItems {
  label: string;
  sortValue: string;
}

const sortItems: SortItems[] = [
  { label: "Last updated", sortValue: "latest" },
  { label: "Category", sortValue: "category" },
  { label: "Custom", sortValue: "custom" },
];

function SidebarSortContent(): ReactNode {
  const searchParams = useSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const activeSort = searchParams.get("sort");

  return (
    <div className="mx-4">
      <Button onClick={() => setIsExpanded((prev) => !prev)}>
        <span className="flex gap-(--spacing-icon-text)">
          <ArrowDownAZ /> Sort by
        </span>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </Button>
      {isExpanded && (
        <div className="mt-2">
          {sortItems.map((item) => (
            <NavLink
              key={item.sortValue}
              href={`?sort=${item.sortValue}`}
              className={cn(
                item.sortValue === activeSort ? "bg-(--sidebar-focus-color)" : "",
              )}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SidebarSort(): ReactNode {
  return (
    <Suspense
      fallback={
        <div>
          <Button disabled>
            <span className="flex">
              <ArrowDownAZ /> Sort by
            </span>
            <ChevronDown />
          </Button>
        </div>
      }
    >
      <SidebarSortContent />
    </Suspense>
  );
}
