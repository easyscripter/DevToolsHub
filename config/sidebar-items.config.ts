import { SidebarItem } from "@/types";
import { ROUTES } from '@/constants';
import { LayoutDashboard, Settings, Wrench } from "lucide-react";

export const sidebarItems: SidebarItem[] = [
	{
		title: "Tools",
		href: ROUTES.TOOLS,
		icon: Wrench
	},
	{
		title: "Workspace",
		href: ROUTES.WORKSPACE,
		icon: LayoutDashboard
	},
	{
		title: "Settings",
		href: ROUTES.SETTINGS,
		icon: Settings
	}
]