import { COLLECTION_CARD_MAX_DESCRIPTION_LENGTH } from "@/config";
import { truncateText } from "@/lib/utils";
import type { ReactNode } from "react";

interface CollectionCardBodyProps {
  description: string;
}

export default function CollectionCardBody({
  description,
}: CollectionCardBodyProps): ReactNode {
  const truncatedDescription = truncateText(
    description,
    COLLECTION_CARD_MAX_DESCRIPTION_LENGTH,
  );
  return <span>{truncatedDescription}</span>;
}
