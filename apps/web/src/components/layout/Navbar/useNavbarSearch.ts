import { SEARCH_DEBOUNCE_MS } from "@/config";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
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
  const ref = useRef(inputValue);

  useEffect(() => {
    console.log("useEffect() called");
    const timer = setTimeout(() => {
      if (inputValue !== ref.current) {
        if (inputValue) {
          console.log("push with params");
          router.push(`?q=${encodeURIComponent(inputValue)}`);
        } else {
          ref.current = inputValue;
          router.push(path);
          console.log("push without params");
        }
      }
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [inputValue, router, path]);

  return { inputValue, setInputValue };
}
