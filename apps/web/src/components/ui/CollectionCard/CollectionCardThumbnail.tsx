import Image from "next/image";
import type { ReactNode } from "react";
import Badge from "@/components/ui/Badge/Badge";
import { Play } from "lucide-react";

interface CollectionCardThumbnailProps {
  thumbnailUrl: string;
  videoCount: number;
}

export default function CollectionCardThumbnail({
  thumbnailUrl,
  videoCount,
}: CollectionCardThumbnailProps): ReactNode {
  const badgeText = `${videoCount} ${videoCount > 1 ? "Videos" : "Video"}`;
  return (
    <div className="relative aspect-video">
      <Image src={thumbnailUrl} fill alt="Collection Thumbnail" />
      <div className="absolute right-2 bottom-2">
        <Badge variant="info" icon={Play} text={badgeText} />
      </div>
    </div>
  );
}
