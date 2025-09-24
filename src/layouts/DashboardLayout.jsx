import { AppSidebar } from "@/components/dashboard/AppSidebar"
import { SidebarInset, SidebarProvider } from "@/components/dashboard/Sidebar"
import { SiteHeader } from "@/components/dashboard/SiteHeader"
import { Outlet } from "react-router"

const DashboardLayout = () => {
  return (
    <SidebarProvider
      style={{ "--sidebar-width": "calc(var(--spacing) * 72)", "--header-height": "calc(var(--spacing) * 12)" }}>

      {/* dashboard sidebar */}
      <AppSidebar variant="inset" />

      {/* dashboard right dynamic side */}
      <SidebarInset>

        {/* there are a collapse button and QodeOn typed */}
        <SiteHeader />

        {/* layout outlet children */}
        <Outlet />

      </SidebarInset>
    </SidebarProvider>
  )
}
export default DashboardLayout