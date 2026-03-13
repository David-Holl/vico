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
      <h2>{category.name}</h2>
      <h3>{name}</h3>
    </div>
  );
}
