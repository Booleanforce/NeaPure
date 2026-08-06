import {
  Users,
  Droplets,
  Shield,
  Wrench,
  CreditCard,
} from "lucide-react";

import { StatsCard } from "../types/dashboard";

export const statsCards: StatsCard[] = [
  {
    title: "Total Customers",
    value: "12,458",
    change: "+12.5%",
    up: true,
    color: "blue",
    icon: Users,
  },
  {
    title: "Total Purifiers",
    value: "15,786",
    change: "+10.2%",
    up: true,
    color: "cyan",
    icon: Droplets,
  },
  {
    title: "Active Warranties",
    value: "13,250",
    change: "+14.3%",
    up: true,
    color: "green",
    icon: Shield,
  },
  {
    title: "Total Services",
    value: "8,964",
    change: "+18.7%",
    up: true,
    color: "purple",
    icon: Wrench,
  },
  {
    title: "Total Revenue",
    value: "৳24,85,600",
    change: "+16.8%",
    up: true,
    color: "orange",
    icon: CreditCard,
  },
];