import { SidebarItem } from '@/types';
import { ROUTES } from '@/constants';
import { LayoutDashboard, Settings, Wrench } from 'lucide-react';

export const sidebarItems: SidebarItem[] = [
	{
		title: 'workspaces',
		href: ROUTES.WORKSPACES,
		icon: LayoutDashboard,
	},
	{
		title: 'tools',
		href: ROUTES.TOOLS,
		icon: Wrench,
	},
	{
		title: 'settings',
		href: ROUTES.SETTINGS,
		icon: Settings,
	},
];
