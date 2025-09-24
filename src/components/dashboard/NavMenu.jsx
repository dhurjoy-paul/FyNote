import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem } from "@/components/dashboard/Sidebar";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router";

export function NavMenu({ items, ...props }) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.disable ? (
                <div className="flex justify-between items-center opacity-50 transition-colors cursor-not-allowed">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-md w-full text-base">
                    <item.icon className="size-5" />
                    <span>{item.title}</span>
                  </div>
                  <span className="px-1 pt-0.5 pb-1 border border-primary rounded-md text-primary text-xs">Coming</span>
                </div>
              ) : (
                <NavLink
                  to={item.url}
                  end
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 mt-1.5 px-3 py-2 rounded-md w-full text-base transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )
                  }
                >
                  <item.icon className="size-5" />
                  <span>{item.title}</span>
                </NavLink>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}