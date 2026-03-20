"use client";
import type { Channel, RecentVideo } from "@/types/collection";
import { useState, type ReactNode } from "react";
import Image from "next/image";
import Button from "../Button/Button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { COLLECTION_EXTENSION_MAX_RECENT_VIDEOS } from "@/config";

interface CollectionCardExtensionProps {
  recentVideos?: RecentVideo[];
}

interface RecentVideoItemProps {
  channel: Channel;
  title: string;
  uploadedAt: Date;
}

function RecentVideoItem({
  channel,
  title,
  uploadedAt,
}: RecentVideoItemProps): ReactNode {
  return (
    <div className="flex flex-row items-center rounded-3xl hover:bg-linear-to-r hover:from-(--surface-secondary) hover:to-transparent">
      <div className="relative h-(--extension-channel-icon) w-(--extension-channel-icon)">
        <Image
          src={channel.thumbnailUrl}
          alt="Channel Thumbnail"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="ml-2 flex flex-1 flex-col">
        <div className="text-sm">{title}</div>
        <div className="flex flex-row text-xs [color:var(--text-color-secondary)]">
          <div>{channel.name}</div>&nbsp;•&nbsp;{" "}
          <div>{uploadedAt.toLocaleDateString("de-DE")}</div> (// TODO: i18n)
        </div>
      </div>
    </div>
  );
}

export default function CollectionCardExtension({
  recentVideos = [],
}: CollectionCardExtensionProps): ReactNode {
  const newestVideos = recentVideos.slice(0, COLLECTION_EXTENSION_MAX_RECENT_VIDEOS);
  const newestVideosLen = newestVideos.length;
  const [isFolded, setIsFolded] = useState(true);
  const videosToShow = isFolded ? newestVideos.slice(0, 1) : newestVideos;
  return (
    <div
      className={cn(
        "bg-(--card-bg-color)",
        "[border-bottom:var(--border-extension)]",
        "[border-left:var(--border-extension)]",
        "[border-right:var(--border-extension)]",
        "rounded-b-(--card-border-radius)",
      )}
    >
      <div className="mx-6">
        <div className="py-2 [color:var(--text-color-secondary)]">Newest videos</div>
        <div className="mr-6 ml-2 flex flex-col gap-4">
          {newestVideosLen > 0 ? (
            videosToShow.map((video) => (
              <RecentVideoItem
                key={video.id}
                channel={video.channel}
                title={video.title}
                uploadedAt={video.uploadedAt}
              />
            ))
          ) : (
            <div className="ml-2 text-sm [color:var(--text-color-secondary)]">
              No videos in this collection yet
            </div>
          )}
        </div>
        <div className="mt-4 mb-4 ml-2 text-xs">
          {newestVideosLen > 1 && (
            <Button onClick={() => setIsFolded((prev) => !prev)}>
              {isFolded ? (
                <>
                  <ChevronDown /> {` show ${newestVideosLen - 1} more`}
                </>
              ) : (
                <>
                  <ChevronUp /> show less
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
