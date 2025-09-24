import { NavMenu } from "@/components/dashboard/NavMenu"
import { NavUser } from "@/components/dashboard/NavUser"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/dashboard/Sidebar"
import { IconBackpack, IconDashboard, IconInnerShadowTop, IconPackage, IconSettings, IconUser, IconUserPlus } from "@tabler/icons-react"
import { DropdownMenuSeparator } from "../ui/dropdown-menu"

const data = {
  user: {
    name: "Owner Name",
    phone: "+8801234567890",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Client Details",
      url: "/dashboard/client-details/:id",
      icon: IconUser,
    },
    {
      title: "Add Clients",
      url: "/dashboard/add-client",
      icon: IconUserPlus,
    },
    {
      title: "Add Packages",
      url: "/dashboard/add-package",
      icon: IconPackage,
    }
  ],
  navSecondary: [
    {
      title: "Backup",
      url: "",
      icon: IconBackpack,
      disable: true,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    }
  ]
}

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>

      {/* header for ISP brand*/}
      <SidebarHeader>
        <div className="flex items-center gap-2 !p-1.5">
          <IconInnerShadowTop className="!size-7" />
          <span className="font-semibold text-xl">ISP Name</span>
        </div>
      </SidebarHeader>
      <DropdownMenuSeparator />

      {/* content / menu */}
      <SidebarContent className="mt-3.5">
        <NavMenu items={data.navMain} />
        <NavMenu items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      {/* footer */}
      <DropdownMenuSeparator />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
