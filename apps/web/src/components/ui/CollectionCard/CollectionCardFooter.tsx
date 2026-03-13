import { getRelativeTime } from "@/lib/utils";
import type { Collection } from "@/types/collection";
import type { ReactNode } from "react";

interface CollectionCardFooterProps {
  collection: Collection;
}

export default function CollectionCardFooter({
  collection,
}: CollectionCardFooterProps): ReactNode {
  const curator = collection.curator.name;
  const subscriberCount = collection.subscriberCount;
  const relativeTime = getRelativeTime(collection.updatedAt);

  return (
    <div>
      <div>{curator}</div>
      <div>{subscriberCount}</div>
      <div>{relativeTime}</div>
    </div>
  );
}
