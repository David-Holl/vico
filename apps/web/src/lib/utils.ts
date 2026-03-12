import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Truncates text at the last full word before maxLength and appends " ..."
 * @param text - The text to truncate
 * @param maxLength - Maximum character length including ellipsis
 * @returns Truncated trimmed string or trimmed original if within limit
 */
export function truncateText(text: string, maxLength: number): string {
  const trimmedText = text.trim();
  if (trimmedText.length <= maxLength) return trimmedText;
  const ellipsis = " ...";
  const effectiveMax = maxLength - ellipsis.length;
  let slicedText = trimmedText.slice(0, effectiveMax);
  const lastSpacingIndex = slicedText.lastIndexOf(" ");
  if (lastSpacingIndex === -1) return slicedText + ellipsis;
  slicedText = slicedText.slice(0, lastSpacingIndex);
  return slicedText + ellipsis;
}

export function getRelativeTime(date: Date): string {
  const nowMs = Date.now();
  const targetMs = date.getTime();

  if (targetMs > nowMs) {
    throw new Error("Date is in the future");
  }

  const diffInSeconds = Math.floor((nowMs - targetMs) / 1000);
  if (diffInSeconds < 60) return "just now";

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60)
    return diffInMinutes === 1 ? "1 minute ago" : `${diffInMinutes} minutes ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24)
    return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 2) return "yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 2) return "last week";

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 1) return `${diffInWeeks} weeks ago`;
  if (diffInMonths < 2) return "last month";

  const diffInYears = Math.floor(diffInDays / 365);
  if (diffInYears < 1) return `${diffInMonths} months ago`;
  if (diffInYears < 2) return "last year";

  return `${diffInYears} years ago`;
}
