import type { ReactNode } from "react";
import Link from "next/link";

export default function Logo(): ReactNode {
  return (
    <Link
      href="/"
      className="text-2xl font-bold text-(--logo-color)"
      aria-label="Go to start page"
    >
      ViCo
    </Link>
  );
}
