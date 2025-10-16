import { AppSidebar } from "@/components/dashboard/AppSidebar"
import { SidebarInset, SidebarProvider } from "@/components/dashboard/Sidebar"
import { SiteHeader } from "@/components/dashboard/SiteHeader"
import GlobalLoader from "@/components/shared/GlobalLoader"
import PageLoaderFallback from "@/components/shared/PageLoaderFallback"
import { Suspense } from 'react'
import { Outlet } from "react-router"

const DashboardLayout = () => {
  return (
    <SidebarProvider
      style={{ "--sidebar-width": "calc(var(--spacing) * 72)", "--header-height": "calc(var(--spacing) * 12)" }}>
      <GlobalLoader />

      {/* dashboard sidebar */}
      <AppSidebar variant="inset" />

      {/* dashboard right dynamic side */}
      <SidebarInset>

        {/* there are a collapse button and QodeOn typed */}
        <SiteHeader />

        {/* layout outlet children */}
        <main className="flex-1 mt-8 px-6 lg:px-8">
          <Suspense fallback={<PageLoaderFallback />}>
            <div className="@container/panel">
              <Outlet />
            </div>
          </Suspense>
        </main>

      </SidebarInset>
    </SidebarProvider>
  )
}
export default DashboardLayout