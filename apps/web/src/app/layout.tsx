import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import { type ReactNode } from "react";
import { SidebarProvider } from "@/context/SideBarContext";
import Sidebar from "@/components/layout/Sidebar/Sidebar";

export const metadata: Metadata = {
  title: "Vico",
  description: "Curation Platform for Videos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <html lang="en">
      <body className="h-screen flex-1 flex-col">
        <SidebarProvider>
          <Navbar />
          <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-(--main-bg-color) p-4">{children}</div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
