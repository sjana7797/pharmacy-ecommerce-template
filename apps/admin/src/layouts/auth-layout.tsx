import { AppSidebar } from "@/admin/components/global/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";

import Header from "@/admin/components/global/header";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
