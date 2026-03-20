"use client";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, ...rest }: ButtonProps): ReactNode {
  return (
    <button
      type="button"
      {...rest}
      className={cn("flex items-center gap-(--spacing-icon-text)", rest.className)}
    >
      {children}
    </button>
  );
}
