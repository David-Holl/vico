import type { ReactNode } from "react";
import { collections } from "@/data/mock/collections/collections";
import CollectionCard from "@/components/ui/CollectionCard/CollectionCard";

export default function Home(): ReactNode {
  return (
    <div className="mx-10 grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-x-15 gap-y-20">
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
}
