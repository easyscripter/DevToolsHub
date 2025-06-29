import { SidebarItem } from "@/types";
import { ROUTES } from '@/constants';
import { LayoutDashboard, Settings, Wrench } from "lucide-react";

export const sidebarItems: SidebarItem[] = [
	{
		title: "Sidebar.workspaces",
		href: ROUTES.WORKSPACES,
		icon: LayoutDashboard
	},
	{
		title: "Sidebar.tools",
		href: ROUTES.TOOLS,
		icon: Wrench
	},
	{
		title: "Sidebar.settings",
		href: ROUTES.SETTINGS,
		icon: Settings
	}
]