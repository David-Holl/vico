import type { Collection } from "@/types/collection";
import type { ReactNode } from "react";
import CollectionCardThumbnail from "./CollectionCardThumbnail";
import { cn } from "@/lib/utils";
import CollectionCardHeader from "./CollectionCardHeader";
import CollectionCardBody from "./CollectionCardBody";

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps): ReactNode {
  return (
    <div
      className={cn(
        "rounded-(--card-border-radius)",
        "[border:var(--border-card)]",
        "overflow-hidden",
        "bg-(--card-bg-color)",
      )}
    >
      <CollectionCardThumbnail
        thumbnailUrl={collection.thumbnailPath}
        videoCount={collection.videoCount}
      />
      <div className="mx-8 mb-8">
        <div className="mt-12">
          <CollectionCardHeader
            category={collection.mainCategory}
            name={collection.name}
          />
        </div>
        <div className="mt-4">
          <CollectionCardBody description={collection.description} />
        </div>
      </div>
    </div>

    // description(collection.description)
    // footer(collection.curator, collection.subscriberCount, collection.updatedAt)
  );
}
