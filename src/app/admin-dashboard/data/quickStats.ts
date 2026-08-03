import {
  Users,
  Droplets,
  Box,
  Wrench,
  Clock,
  UserCog,
} from "lucide-react";
import { QuickStat } from "../types/dashboard";

export const quickStats: QuickStat[] = [

  {
    title: "New Customers",
    value: "324",
    change: "+11.6%",
    up: true,
    icon: Users,
    color: "blue",
  },
  {
    title: "New Purifiers Sold",
    value: "452",
    change: "+13.2%",
    up: true,
    icon: Droplets,
    color: "cyan",
  },
  {
    title: "Kits Sold",
    value: "1,285",
    change: "+15.3%",
    up: true,
    icon: Box,
    color: "pink",
  },
  {
    title: "Today's Services",
    value: "186",
    change: "+5.6%",
    up: true,
    icon: Wrench,
    color: "purple",
  },
  {
    title: "Pending Requests",
    value: "264",
    change: "+5.3%",
    up: false,
    icon: Clock,
    color: "orange",
  },
  {
    title: "Active Technicians",
    value: "48",
    change: "Online",
    up: true,
    icon: UserCog,
    color: "green",
  },
];