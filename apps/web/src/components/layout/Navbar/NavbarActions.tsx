"use client";
import Button from "@/components/ui/Button/Button";
import { LogOut } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { User } from "lucide-react";
import type { ReactNode } from "react";

export default function NavbarActions(): ReactNode {
  return (
    <div className="flex items-center gap-4">
      <Button onClick={() => {}} aria-label="Feedback Button" className="mr-4">
        <MessageSquare />
        Feedback
      </Button>
      <Button onClick={() => {}} aria-label="User Profile Button">
        <User />
      </Button>
      <Button onClick={() => {}} aria-label="User Logout Button">
        <LogOut />
      </Button>
    </div>
  );
}
