import { LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  icon: LucideIcon;
}

export interface StatsCard {
  title: string;
  value: string;
  change: string;
  up: boolean;
  color: "blue" | "cyan" | "green" | "purple" | "orange";
  icon: LucideIcon;
}


export interface QuickStat {
  title: string;
  value: string;
  change: string;
  up: boolean;
  icon: LucideIcon;
  color:
    | "blue"
    | "cyan"
    | "pink"
    | "purple"
    | "orange"
    | "green";
}