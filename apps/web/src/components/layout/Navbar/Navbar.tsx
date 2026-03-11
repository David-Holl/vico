import type { ReactNode } from "react";
import Logo from "@/components/ui/Logo/Logo";
import NavbarHamburger from "@/components/layout/Navbar/NavbarHamburger";
import NavbarActions from "./NavbarActions";
import NavbarSearch from "./NavbarSearch";

export default function Navbar(): ReactNode {
  return (
    <nav className="sticky top-0 z-(--navbar-z) flex h-(--navbar-height) w-full items-center border-b border-(--navbar-border-color) bg-(--navbar-bg)">
      <div className="ml-4 flex flex-1 items-center gap-2">
        <NavbarHamburger />
        <Logo />
      </div>
      <div className="flex flex-1 justify-center">
        <NavbarSearch />
      </div>
      <div className="mr-4 flex flex-1 items-center justify-end gap-2">
        <NavbarActions />
      </div>
    </nav>
  );
}
