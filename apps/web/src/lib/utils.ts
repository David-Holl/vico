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
