import { NavMenu } from "@/components/dashboard/NavMenu"
import { NavUser } from "@/components/dashboard/NavUser"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/dashboard/Sidebar"
import { navigationConfig } from "@/config/navigation"
// import { useAuth } from "@/hooks/useAuth"
import { useAuth } from "@/hooks/allHooks"
import { IconInnerShadowTop } from "@tabler/icons-react"
import { DropdownMenuSeparator } from "../ui/dropdown-menu"


export function AppSidebar({ ...props }) {
  const {
    data: user,
    isLoading,
    error,
    refetch,
    isRefetching
  } = useAuth();

  const { ispName, ispLogo } = user || {};


  return (
    <Sidebar collapsible="offcanvas" {...props}>

      {/* header for ISP brand*/}
      <SidebarHeader>
        <div className="flex items-center gap-2 !p-1.5">
          {
            ispLogo
              ? <img src={ispLogo} alt="ISP Logo" className="rounded-sm w-8 h-8 object-cover" />
              : <IconInnerShadowTop className="!size-7" />
          }
          <span className="font-semibold text-xl">{ispName || "ISP Name"}</span>
        </div>
      </SidebarHeader>
      <DropdownMenuSeparator />

      {/* content / menu */}
      <SidebarContent className="mt-3.5">
        <NavMenu items={navigationConfig.navMain} />
        <NavMenu items={navigationConfig.navSecondary} className="mt-auto" />
      </SidebarContent>

      {/* footer */}
      <DropdownMenuSeparator />
      <SidebarFooter>
        <NavUser user={user} isLoading={isLoading} />
      </SidebarFooter>
    </Sidebar>
  );
}
