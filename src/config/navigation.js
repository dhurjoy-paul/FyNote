import {
  IconBackpack,
  IconDashboard,
  IconMapPinSearch,
  IconPackage,
  IconSettings,
  IconUser,
  IconUserPlus
} from "@tabler/icons-react";


export const navigationConfig = {
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
      title: "Packages",
      url: "/dashboard/packages",
      icon: IconPackage,
    },
    {
      title: "Get Location",
      url: "/dashboard/get-location",
      icon: IconMapPinSearch,
      badge: "Beta",
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
};