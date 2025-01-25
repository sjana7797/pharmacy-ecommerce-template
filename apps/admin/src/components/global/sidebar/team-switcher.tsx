"use client";

import { SidebarMenu, SidebarMenuButton } from "@repo/ui/components/sidebar";
import { useNavigate } from "@tanstack/react-router";
import { GalleryVerticalEnd } from "lucide-react";

export function TeamSwitcher() {
  // hooks
  const navigate = useNavigate();

  const activeTeam = {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  };

  return (
    <SidebarMenu>
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        onClick={() =>
          navigate({
            to: "/",
          })
        }
      >
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <activeTeam.logo className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">{activeTeam.name}</span>
          <span className="truncate text-xs">{activeTeam.plan}</span>
        </div>
      </SidebarMenuButton>
    </SidebarMenu>
  );
}
