import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { cn, truncateText, getRelativeTime } from "@/lib/utils";

describe("cn utility", () => {
  it("should merge class names correctly", () => {
    expect(cn("bg-red-500", "text-white")).toBe("bg-red-500 text-white");
  });

  it("should handle conditional classes", () => {
    expect(cn("px-2", true && "py-2", false && "mt-4")).toBe("px-2 py-2");
  });

  it("should merge tailwind classes and resolve conflicts", () => {
    expect(cn("px-4 py-2", "px-2")).toBe("py-2 px-2");
  });

  it("should handle objects correctly", () => {
    expect(cn({ "bg-blue-500": true, "text-center": false })).toBe("bg-blue-500");
  });

  it("should ignore undefined, null and boolean values", () => {
    expect(cn("base", undefined, null, false, true)).toBe("base");
  });
});

describe("truncateText utility", () => {
  it("should return the full trimmed text if within limits", () => {
    expect(truncateText("Hello World", 11)).toBe("Hello World");
    expect(truncateText("  Hello World  ", 11)).toBe("Hello World");
  });

  it("should truncate at the last full word including ellipsis in length", () => {
    expect(truncateText("Sticky Note", 10)).toBe("Sticky ...");
  });

  it("should leave double punctuation", () => {
    expect(truncateText("End. More text", 8)).toBe("End. ...");
  });

  it("should hard truncate if no spaces are found before limit", () => {
    expect(truncateText("Antidisestablishmentarianism", 10)).toBe("Antidi ...");
  });
});

describe("getRelativeTime utility", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-03-30T20:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return 'just now' for timestamps less than 60 seconds ago", () => {
    expect(getRelativeTime(new Date("2026-03-30T19:59:01Z"))).toBe("just now");
  });
  it("should return 'just now' for current time (0 seconds difference)", () => {
    expect(getRelativeTime(new Date("2026-03-30T20:00:00Z"))).toBe("just now");
  });
  it("should throw an error if the date is in the future", () => {
    expect(() => getRelativeTime(new Date("2026-03-30T20:00:01Z"))).toThrow(
      "Date is in the future",
    );
  });
  it("should return '1 minute ago' when exactly 60 sec have passed", () => {
    expect(getRelativeTime(new Date("2026-03-30T19:59:00Z"))).toBe("1 minute ago");
  });
  it("should round down '1 minute ago' when 119 sec have passed", () => {
    expect(getRelativeTime(new Date("2026-03-30T19:58:01Z"))).toBe("1 minute ago");
  });
  it("should return '2 minutes ago' when 120 sec have passed", () => {
    expect(getRelativeTime(new Date("2026-03-30T19:58:00Z"))).toBe("2 minutes ago");
  });
  it("should return '59 minutes ago' when 1 hour minus 1 sec have passed", () => {
    expect(getRelativeTime(new Date("2026-03-30T19:00:01Z"))).toBe("59 minutes ago");
  });
  it("should return '1 hour ago' when 1 hour have passed", () => {
    expect(getRelativeTime(new Date("2026-03-30T19:00:00Z"))).toBe("1 hour ago");
  });
  it("should return '1 hour ago' when 1 hour, 59min and 59sec have passed", () => {
    expect(getRelativeTime(new Date("2026-03-30T18:00:01Z"))).toBe("1 hour ago");
  });
  it("should return '2 hours ago' when 2 hours have passed", () => {
    expect(getRelativeTime(new Date("2026-03-30T18:00:00Z"))).toBe("2 hours ago");
  });
  it("should return '23 hours ago' when 24h minus 1 sec have passed", () => {
    expect(getRelativeTime(new Date("2026-03-29T20:00:01Z"))).toBe("23 hours ago");
  });
  it("should return 'yesterday' when 24h have passed", () => {
    expect(getRelativeTime(new Date("2026-03-29T20:00:00Z"))).toBe("yesterday");
  });
  it("should return 'yesterday' when 2 days minus 1sec have passed", () => {
    expect(getRelativeTime(new Date("2026-03-28T20:00:01Z"))).toBe("yesterday");
  });
  it("should return '2 days ago' when 2 days have passed", () => {
    expect(getRelativeTime(new Date("2026-03-28T20:00:00Z"))).toBe("2 days ago");
  });
  it("should return '6 days ago' when 1 week minus 1 sec have passed", () => {
    expect(getRelativeTime(new Date("2026-03-23T20:00:01Z"))).toBe("6 days ago");
  });
  it("should return 'last week' when 1 week have passed", () => {
    expect(getRelativeTime(new Date("2026-03-23T20:00:00Z"))).toBe("last week");
  });
  it("should return 'last week' when 2 weeks minus 1 sec have passed", () => {
    expect(getRelativeTime(new Date("2026-03-16T20:00:01Z"))).toBe("last week");
  });
  it("should return '2 weeks ago' when 2 weeks have passed", () => {
    expect(getRelativeTime(new Date("2026-03-16T20:00:00Z"))).toBe("2 weeks ago");
  });
  it("should return '3 weeks ago' when 1 month minus 1sec have passed", () => {
    expect(getRelativeTime(new Date("2026-03-02T20:00:01Z"))).toBe("3 weeks ago");
  });
  it("should return 'last month' when 1 month have passed", () => {
    expect(getRelativeTime(new Date("2026-02-28T20:00:00Z"))).toBe("last month");
  });
  it("should return 'last month' when 2 months minus 1 sec have passed", () => {
    expect(getRelativeTime(new Date("2026-01-30T20:00:01Z"))).toBe("last month");
  });
});
