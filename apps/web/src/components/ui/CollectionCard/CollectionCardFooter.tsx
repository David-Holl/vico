import { getRelativeTime } from "@/lib/utils";
import { Calendar, UserRoundPen, UsersRound } from "lucide-react";
import type { ReactNode } from "react";

interface CollectionCardFooterProps {
  curatorName: string;
  subscriberCount: number;
  updatedAt: Date;
}

export default function CollectionCardFooter({
  curatorName,
  subscriberCount,
  updatedAt,
}: CollectionCardFooterProps): ReactNode {
  const relativeTime = getRelativeTime(updatedAt);

  return (
    <div className="text-card-footer flex items-center">
      <div className="flex flex-2 items-center gap-2">
        <UserRoundPen className={"size-(--card-footer-icon-size)"} />
        {curatorName}
      </div>
      <div className="flex flex-1 items-center gap-2">
        <UsersRound className={"size-(--card-footer-icon-size)"} />
        {subscriberCount}
      </div>
      <div className="flex flex-1 items-center gap-2">
        <Calendar className={"size-(--card-footer-icon-size)"} />
        {relativeTime}
      </div>
    </div>
  );
}
