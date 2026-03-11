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
      <body className="flex h-screen flex-col">
        <SidebarProvider>
          <Navbar />
          <div className="flex flex-1">
            <Sidebar />
            {children}
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
