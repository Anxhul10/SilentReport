import * as React from "react";
import {
  IconDashboard,
  IconInnerShadowTop,
  IconReport,
  IconSearch,
  IconSettings,
  IconPencilPlus,
} from "@tabler/icons-react";
import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState, useEffect } from "react";

export function AppSidebar({
  onDashboardParent,
  onFeedParent,
  onSearchParent,
  onCreateReportParent,
  onViewReportParent,
  onAPIHitParent,
  ...props
}: React.ComponentProps<any>) {
  const [email, setEmail] = useState("");
  const data = {
    user: {
      name: email[0],
      email: email,
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: IconDashboard,
      },
      {
        title: "Explore Reports",
        url: "#",
        icon: IconSearch,
      },
    ],
    navSecondary: [
      {
        title: "CyborgDB API",
        url: "#",
        icon: IconSettings,
      },
    ],
    documents: [
      {
        name: "Create Report",
        url: "#",
        icon: IconPencilPlus,
      },
      {
        name: "View Reports",
        url: "#",
        icon: IconReport,
      },
    ],
  };
  useEffect(() => {
    setTimeout(() => {
      const user_id = localStorage.getItem("user_id");
      fetch("/api/getEmail", {
        method: "POST",
        body: JSON.stringify({ user_id }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            console.log("api present");
            setEmail(data.email);
          } else {
            console.log("api donot exist");
          }
        });
    }, 200);
  }, []);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="Dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">SilentReport</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain}
          onDash={() => {
            onDashboardParent();
          }}
          onSearch={() => {
            onSearchParent();
          }}
        />
        <NavDocuments
          items={data.documents}
          onCreateReport={() => {
            onCreateReportParent();
          }}
          onViewReport={() => {
            onViewReportParent();
          }}
        />
        <NavSecondary
          items={data.navSecondary}
          className="mt-auto"
          onAPIHit={() => {
            onAPIHitParent();
          }}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
