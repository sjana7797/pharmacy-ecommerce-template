import Header from "@/admin/components/global/header";
import { AppSidebar } from "@/admin/components/global/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/_layout")({
  component: () => (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  ),
});
