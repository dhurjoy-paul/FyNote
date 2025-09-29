import LoadingSpinner from "@/assets/loadingSpinner";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/dashboard/Sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { api } from "@/utils/api";
import { IconDotsVertical, IconLogout, IconUserCircle } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { HashIcon } from "lucide-react";
import { useNavigate } from "react-router";

export function NavUser({ user, isLoading }) {
  const { isMobile } = useSidebar();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    ownerName = "Unknown User",
    phone = "N/A",
    email = "N/A",
  } = user || {};

  async function handleLogout() {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      queryClient.clear();
      navigate("/login", { replace: true });
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <p><HashIcon /></p>
              {isLoading ? (
                <LoadingSpinner className="size-4" />
              ) : (
                <div className="flex-1 grid text-sm text-left leading-tight">
                  <span className="font-medium truncate">{ownerName}</span>
                  <span className="text-muted-foreground text-xs truncate">
                    {phone}
                  </span>
                </div>
              )}
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-base">
                <IconUserCircle className="size-6" />
                Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-base" onClick={handleLogout}>
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
