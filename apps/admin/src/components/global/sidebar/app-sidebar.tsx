"use client";

import * as React from "react";
import {
  Blocks,
  BookOpen,
  DollarSign,
  Image,
  ShipWheel,
  ShoppingCart,
  Users,
} from "lucide-react";

import { NavMain } from "@/admin/components/global/sidebar/nav-main";
import { NavProjects } from "@/admin/components/global/sidebar/nav-projects";
import { NavUser } from "@/admin/components/global/sidebar/nav-user";
import { TeamSwitcher } from "@/admin/components/global/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@repo/ui/components/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Product",
      url: "/product",
      icon: ShipWheel,
      isActive: true,
      items: [
        {
          title: "All Products",
          url: "/product",
        },
        {
          title: "Add Product",
          url: "/product/add",
        },
      ],
    },
    {
      title: "Brands",
      url: "/brand",
      icon: Blocks,
      items: [
        {
          title: "All Brands",
          url: "/brand",
        },
        {
          title: "Add New Brand",
          url: "/brand/add",
        },
      ],
    },
    {
      title: "Categories",
      url: "/",
      icon: BookOpen,
      items: [
        {
          title: "All Categories",
          url: "/category",
        },
        {
          title: "Add New Category",
          url: "/category/add",
        },
      ],
    },
    {
      title: "Orders",
      url: "/order",
      icon: ShoppingCart,
      items: [
        {
          title: "All Orders",
          url: "/order",
        },
        {
          title: "Add New Order",
          url: "/order/add",
        },
      ],
    },
    {
      title: "Transactions",
      url: "/transaction",
      icon: DollarSign,
      items: [
        {
          title: "All Transactions",
          url: "/transaction",
        },
      ],
    },
    {
      title: "Users",
      url: "/user",
      icon: Users,
      items: [
        {
          title: "All Users",
          url: "/user",
        },
        {
          title: "Add New User",
          url: "/user/add",
        },
      ],
    },
    {
      title: "Banners",
      url: "/banner",
      icon: Image,
      items: [
        {
          title: "All Banners",
          url: "/banner",
        },
        {
          title: "Add New Banner",
          url: "/banner/add",
        },
      ],
    },
  ],
  quickLinks: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent className="scrollbar-none">
        <NavMain items={data.navMain} />
        <NavProjects quickLinks={data.quickLinks} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
