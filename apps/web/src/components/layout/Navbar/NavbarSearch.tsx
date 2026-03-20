"use client";
import SearchInput from "@/components/ui/SearchInput/SearchInput";

import { Suspense, type ReactNode } from "react";
import { useNavbarSearch } from "./useNavbarSearch";

const className = "w-full max-w-(--navbar-search-max-width)";

function NavbarSearchContent(): ReactNode {
  const { inputValue, setInputValue } = useNavbarSearch();

  return (
    <SearchInput
      value={inputValue}
      onValueChange={setInputValue}
      className={className}
    />
  );
}

export default function NavbarSearch(): ReactNode {
  return (
    <Suspense
      fallback={<SearchInput value="" onValueChange={() => {}} className={className} />}
    >
      <NavbarSearchContent />
    </Suspense>
  );
}
