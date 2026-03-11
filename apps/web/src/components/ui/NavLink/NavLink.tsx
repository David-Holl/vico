import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NavLink({
  children,
  href,
  ...rest
}: ComponentProps<typeof Link>): ReactNode {
  return (
    <Link
      {...rest}
      href={href}
      className={cn("flex items-center gap-3", rest.className)}
    >
      {children}
    </Link>
  );
}
