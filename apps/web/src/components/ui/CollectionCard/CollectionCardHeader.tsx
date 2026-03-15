import type { MainCategory } from "@/types/collection";
import type { ReactNode } from "react";

interface CollectionCardHeaderProps {
  category: MainCategory;
  name: string;
}

export default function CollectionCardHeader({
  category,
  name,
}: CollectionCardHeaderProps): ReactNode {
  return (
    <div>
      <h1 className={"text-card-category [color:var(--text-color-secondary)]"}>
        {category.name}
      </h1>
      <h1 className={"text-card-name [color:var(--text-color-primary)]"}>{name}</h1>
    </div>
  );
}
