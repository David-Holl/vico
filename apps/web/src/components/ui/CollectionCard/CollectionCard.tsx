import type { Collection } from "@/types/collection";
import type { ReactNode } from "react";
import CollectionCardThumbnail from "./CollectionCardThumbnail";
import { cn } from "@/lib/utils";
import CollectionCardHeader from "./CollectionCardHeader";
import CollectionCardBody from "./CollectionCardBody";
import CollectionCardFooter from "./CollectionCardFooter";
import CollectionCardExtension from "./CollectionCardExtension";

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps): ReactNode {
  return (
    <div>
      <div className={cn("flex", "flex-col", "h-140", "overflow-hidden")}>
        <div className="overflow-hidden rounded-t-(--card-border-radius)">
          <CollectionCardThumbnail
            thumbnailUrl={collection.thumbnailPath}
            videoCount={collection.videoCount}
          />
        </div>
        <div
          className={cn(
            "flex",
            "flex-1",
            "flex-col",
            "bg-(--card-bg-color)",
            "[border-bottom:var(--border-card)]",
            "[border-left:var(--border-card)]",
            "[border-right:var(--border-card)]",
          )}
        >
          <div className="mx-6 flex-1">
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
          <div className="mx-6 mb-4">
            <CollectionCardFooter
              curatorName={collection.curator.name}
              subscriberCount={collection.subscriberCount}
              updatedAt={collection.updatedAt}
            />
          </div>
        </div>
      </div>
      <div>
        <CollectionCardExtension recentVideos={collection.recentVideos ?? []} />
      </div>
    </div>
  );
}
