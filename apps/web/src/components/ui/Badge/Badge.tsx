import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface BadgeProps {
  text?: string;
  icon?: LucideIcon;
  variant: Variant;
}

const variants = {
  info: {
    backgroundColor: "bg-(--badge-bg-color-info)",
    textColor: "text-(--badge-text-color-info)",
    iconColor: "text-(--badge-icon-color-info)",
    borderColor: "border-(--badge-border-color-info)",
    borderSize: "border-(--badge-border-size)",
  },
};
type Variant = keyof typeof variants;

export default function Badge({ variant, text, icon: Icon }: BadgeProps): ReactNode {
  const style = variants[variant];
  if (!Icon && !text) return null;
  return (
    <div
      className={cn(
        style.backgroundColor,
        style.borderColor,
        style.borderSize,
        style.textColor,
        Icon && text && "gap-(--spacing-icon-text-small)",
        "flex",
        "rounded-(--badge-border-radius)",
        "[border:var(--badge-border-info)]",
        "px-1",
        "py-0.5",
        "items-center",
      )}
    >
      {Icon && (
        <Icon style={{ width: "var(--text-badge)", height: "var(--text-badge)" }} />
      )}

      {text && <div className={"text-badge"}>{text}</div>}
    </div>
  );
}
