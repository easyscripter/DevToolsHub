import { SidebarItem } from "@/types";
import { ROUTES } from '@/constants';
import { LayoutDashboard, Settings, Wrench } from "lucide-react";

export const sidebarItems: SidebarItem[] = [
	{
		title: "Workspace",
		href: ROUTES.WORKSPACE,
		icon: LayoutDashboard
	},
	{
		title: "Tools",
		href: ROUTES.TOOLS,
		icon: Wrench
	},
	{
		title: "Settings",
		href: ROUTES.SETTINGS,
		icon: Settings
	}
]