import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
import Image from 'next/image';
import logo from "@/public/assets/logo.png";
import { sidebarItems } from '@/config';

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader className='flex pt-10'>
				<Image src={logo} alt="logo" className='object-contain max-h-10' />
			</SidebarHeader>
			<SidebarContent className='mt-20'>
				<SidebarGroup>
					<SidebarGroupContent className='space-y-1.5'>
						{sidebarItems.map((item) => (
							<SidebarMenuItem className='list-none font-sans' key={item.title}>
							<SidebarMenuButton asChild>
								<a href={item.href}>
									<item.icon />
									<span className='text-sm font-medium'>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
						))}
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}