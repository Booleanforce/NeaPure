import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Wrench,
  FileText,
  UserCog,
  MapPin,
  Box,
  Shield,
  CreditCard,
  BarChart3,
  Bell,
  Settings,
  UserCircle,
} from "lucide-react";

export const navItems = [
  {
    name: "Dashboard",
    href: "/admin-dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "Customers",
    href: "/admin-dashboard/customers",
    icon: Users,
  },

  {
    name: "Products",
    href: "/admin-dashboard/products",
    icon: Package,
  },
    {
    name: "Dealers",
    href: "/admin-dashboard/dealers",
    icon: UserCog,
  }, 
  {
    name: "Technicians",
    href: "/admin-dashboard/technicians",
    icon: UserCog,
  },
  {
    name: "Sales & Orders",
    href: "/admin-dashboard/orders",
    icon: ShoppingCart,
  },

  {
    name: "Installations",
    href: "/admin-dashboard/installations",
    icon: Wrench,
  },

  {
    name: "Service Requests",
    href: "/admin-dashboard/service-requests",
    icon: FileText,
  },


  {
    name: "Service Tracking",
    href: "/admin-dashboard/service-tracking",
    icon: MapPin,
  },

  {
    name: "Replacement Kits",
    href: "/admin-dashboard/replacement-kits",
    icon: Box,
  },

  {
    name: "Warranty",
    href: "/admin-dashboard/warranty",
    icon: Shield,
  },

  {
    name: "Payments",
    href: "/admin-dashboard/payments",
    icon: CreditCard,
  },

  {
    name: "Reports & Analytics",
    href: "/admin-dashboard/reports",
    icon: BarChart3,
  },

  {
    name: "Notifications",
    href: "/admin-dashboard/notifications",
    icon: Bell,
  },

  {
    name: "Settings",
    href: "/admin-dashboard/settings",
    icon: Settings,
  },

  {
    name: "User Management",
    href: "/admin-dashboard/users",
    icon: UserCircle,
  },
] as const;