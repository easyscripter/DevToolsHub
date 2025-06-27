'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useWorkspacesStore } from '@/store/workspaces';
import { 
	PlusIcon, 
	TrashIcon,
	FolderIcon,
	HomeIcon,
	SettingsIcon,
	CodeIcon,
	PaletteIcon,
	DatabaseIcon,
	FileTextIcon,
	LayersIcon,
	ZapIcon
} from 'lucide-react';
import { useState } from 'react';
import React from 'react';

const availableIcons = [
	{ value: 'FolderIcon', icon: FolderIcon, label: 'Folder' },
	{ value: 'HomeIcon', icon: HomeIcon, label: 'Home' },
	{ value: 'SettingsIcon', icon: SettingsIcon, label: 'Settings' },
	{ value: 'CodeIcon', icon: CodeIcon, label: 'Code' },
	{ value: 'PaletteIcon', icon: PaletteIcon, label: 'Palette' },
	{ value: 'DatabaseIcon', icon: DatabaseIcon, label: 'Database' },
	{ value: 'FileTextIcon', icon: FileTextIcon, label: 'File Text' },
	{ value: 'LayersIcon', icon: LayersIcon, label: 'Layers' },
	{ value: 'ZapIcon', icon: ZapIcon, label: 'Zap' },
	{ value: 'PlusIcon', icon: PlusIcon, label: 'Plus' },
];

export default function Workspaces() {
	const { workspaces, createWorkspace } = useWorkspacesStore();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		icon: 'FolderIcon'
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		
		const newWorkspace = {
			id: Date.now().toString(),
			name: formData.name,
			description: formData.description,
			icon: formData.icon,
			tools: []
		};
		
		createWorkspace(newWorkspace);
		setFormData({ name: '', description: '', icon: 'FolderIcon' });
		setIsDialogOpen(false);
	};

	const getIconComponent = (iconName: string) => {
		const iconOption = availableIcons.find(icon => icon.value === iconName);
		return iconOption ? iconOption.icon : FolderIcon;
	};

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-col gap-2'>
				<h1 className='text-3xl font-bold mt-4'>Workspaces</h1>
				<p className='text-muted-foreground'>Manage your workspaces</p>
			</div>
			<div className='flex gap-4 w-full flex-wrap'>
				{workspaces.length > 0 ? (
					workspaces.map(workspace => (
						<Card key={workspace.id} className='gap-4 w-52'>
							<CardHeader className='flex flex-col items-center gap-4'>
								{React.createElement(getIconComponent(workspace.icon), { className: 'w-10 h-10' })}
								<CardTitle className='text-center font-bold text-lg'>
									{workspace.name}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-center text-muted-foreground'>
									{workspace.description}
								</p>
							</CardContent>
							<CardFooter>
								<Button size='sm' variant='destructive' className='w-full'>
									<TrashIcon className='w-4 h-4' />
								</Button>
							</CardFooter>
						</Card>
					))
				) : (
					<div className='flex flex-col gap-8'>
						<p className='text-muted-foreground'>No workspaces found</p>
						<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
							<DialogTrigger asChild>
								<Button size='sm'>
									<PlusIcon className='w-4 h-4' />
									Create Workspace
								</Button>
							</DialogTrigger>
							<DialogContent>
								<form onSubmit={handleSubmit}>
									<DialogHeader>
										<DialogTitle>Create Workspace</DialogTitle>
										<DialogDescription>
											Create a new workspace to organize your tools.
										</DialogDescription>
									</DialogHeader>
									<div className='grid gap-4'>
										<div className='grid gap-3'>
											<Label htmlFor='name'>Name</Label>
											<Input
												id='name'
												name='name'
												value={formData.name}
												onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
												required
											/>
										</div>
										<div className='grid gap-3'>
											<Label htmlFor='description'>Description</Label>
											<Input
												id='description'
												name='description'
												value={formData.description}
												onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
												required
											/>
										</div>
										<div className='grid gap-3'>
											<Label htmlFor='icon'>Icon</Label>
											<Select 
												value={formData.icon} 
												onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select an icon" />
												</SelectTrigger>
												<SelectContent>
													{availableIcons.map((iconOption) => (
														<SelectItem key={iconOption.value} value={iconOption.value}>
															<div className="flex items-center gap-2">
																<iconOption.icon className="w-4 h-4" />
																<span>{iconOption.label}</span>
															</div>
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>
									</div>
									<DialogFooter>
										<Button type='submit'>Create</Button>
									</DialogFooter>
								</form>
							</DialogContent>
						</Dialog>
					</div>
				)}
			</div>
		</div>
	);
}
