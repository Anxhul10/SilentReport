"use client";

import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavDocuments({
  items,
  onCreateReport,
  onViewReport,
  onSummary,
}: {
  items: {
    name: string;
    url: string;
    icon: Icon;
  }[];
  onCreateReport: any;
  onViewReport: any;
  onSummary: any;
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Documents</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              onClick={() => {
                if (item.name === "Create Report") {
                  onCreateReport();
                }
                if (item.name === "View Reports") {
                  onViewReport();
                }
                if (item.name === "Summarize created reports") {
                  onSummary();
                }
              }}
            >
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
