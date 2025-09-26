import LoadingSpinner from "@/assets/loadingSpinner";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/dashboard/Sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { IconDotsVertical, IconLogout, IconUserCircle } from "@tabler/icons-react";
import { HashIcon } from "lucide-react";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data: user, error, isLoading, refetch } = useAuth();
  const { ispName, ispLogo, ownerName, phone, email, createdAt, updatedAt } = user || {
    ownerName: "Unknown User",
    phone: "N/A",
    email: "N/A",
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <p><HashIcon /></p>
              {
                isLoading
                  ? <LoadingSpinner className="size-px" />
                  : <div className="flex-1 grid text-sm text-left leading-tight">
                    <span className="font-medium truncate">{ownerName}</span>
                    <span className="text-muted-foreground text-xs truncate">{phone}</span>
                  </div>
              }
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-base">
                <IconUserCircle className="size-6" />
                Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-base">
                <IconLogout className="size-6" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>

        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
