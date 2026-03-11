import { SEARCH_DEBOUNCE_MS } from "@/config";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import { type Dispatch } from "react";
import { type SetStateAction } from "react";

export function useNavbarSearch(): {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
} {
  const searchParams = useSearchParams();
  const router = useRouter();
  const path = usePathname();
  const [inputValue, setInputValue] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentQuery = searchParams.get("q") ?? "";
      if (inputValue !== currentQuery) {
        if (inputValue) {
          router.push(`?q=${encodeURIComponent(inputValue)}`);
        } else {
          router.push(path);
        }
      }
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [inputValue, router, path, searchParams]);

  return { inputValue, setInputValue };
}
