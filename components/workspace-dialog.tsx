'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Workspace } from '@/types/workspace';
import { workspaceIcons } from '@/config';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

type WorkspaceDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onCreateWorkspace: (workspace: Workspace) => void;
};

export default function WorkspaceDialog({
	open,
	onOpenChange,
	onCreateWorkspace,
}: WorkspaceDialogProps) {
	const workspacesTranslations = useTranslations(
		'Workspaces.createWorkspaceDialog'
	);
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		icon: 'FolderIcon',
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const newWorkspace: Workspace = {
			id: Date.now().toString(),
			name: formData.name,
			description: formData.description,
			icon: formData.icon,
			tools: [],
		};

		onCreateWorkspace(newWorkspace);
		setFormData({ name: '', description: '', icon: 'FolderIcon' });
		onOpenChange(false);
	};

	const isFormValid =
		formData.name.trim().length > 0 && formData.description.trim().length > 0;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>{workspacesTranslations('title')}</DialogTitle>
						<DialogDescription>
							{workspacesTranslations('description')}
						</DialogDescription>
					</DialogHeader>
					<div className='grid mt-5 gap-4'>
						<div className='grid gap-3'>
							<Label htmlFor='name'>
								{workspacesTranslations('nameLabel')}
							</Label>
							<Input
								id='name'
								name='name'
								value={formData.name}
								onChange={e =>
									setFormData(prev => ({
										...prev,
										name: e.target.value,
									}))
								}
								maxLength={20}
								placeholder={workspacesTranslations('namePlaceholder')}
								required
							/>
							<div className='flex justify-end items-center text-xs text-muted-foreground'>
								<span
									className={
										formData.name.replace(/\s/g, '').length >= 20
											? 'text-orange-500'
											: ''
									}
								>
									{formData.name.replace(/\s/g, '').length}/20
								</span>
							</div>
						</div>
						<div className='grid gap-3'>
							<Label htmlFor='description'>
								{workspacesTranslations('descriptionLabel')}
							</Label>
							<Textarea
								id='description'
								name='description'
								value={formData.description}
								onChange={e =>
									setFormData(prev => ({
										...prev,
										description: e.target.value,
									}))
								}
								maxLength={50}
								placeholder={workspacesTranslations('descriptionPlaceholder')}
								className='resize-none'
								required
							/>
							<div className='flex justify-end items-center text-xs text-muted-foreground'>
								<span
									className={
										formData.description.replace(/\s/g, '').length >= 50
											? 'text-orange-500'
											: ''
									}
								>
									{formData.description.replace(/\s/g, '').length}/50
								</span>
							</div>
						</div>
						<div className='grid gap-3'>
							<Label htmlFor='icon'>
								{workspacesTranslations('iconLabel')}
							</Label>
							<Select
								value={formData.icon}
								onValueChange={value =>
									setFormData(prev => ({ ...prev, icon: value }))
								}
							>
								<SelectTrigger>
									<SelectValue
										placeholder={workspacesTranslations('iconPlaceholder')}
									/>
								</SelectTrigger>
								<SelectContent>
									{workspaceIcons.map(iconOption => (
										<SelectItem key={iconOption.value} value={iconOption.value}>
											<div className='flex items-center gap-2'>
												<iconOption.icon className='w-4 h-4' />
												<span>{iconOption.label}</span>
											</div>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<DialogFooter>
						<Button type='submit' disabled={!isFormValid}>
							{workspacesTranslations('create')}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
