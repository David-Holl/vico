import { describe, it, expect } from "vitest";
import { cn, truncateText } from "@/lib/utils";

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
