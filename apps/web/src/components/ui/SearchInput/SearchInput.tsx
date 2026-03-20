"use client";
import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";
import type { ReactNode } from "react";

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onValueChange: (value: string) => void;
}

export default function SearchInput({
  value,
  onValueChange,
  ...rest
}: SearchProps): ReactNode {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      placeholder="Search for Collections, Categories or Curators..."
      aria-label="Search"
      {...rest}
      className={cn("rounded-lg bg-(--navbar-search-bg) px-4 py-1.5", rest.className)}
    />
  );
}
