'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useWorkspacesStore } from '@/store/workspaces';
import { useToolsStore } from '@/store/tools';
import { Tool } from '@/types/tools';

type InstallToolDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	tool: Tool | null;
	onInstall: (workspaceId: string) => void;
};

export default function InstallToolDialog({
	open,
	onOpenChange,
	tool,
	onInstall,
}: InstallToolDialogProps) {
	const toolsTranslations = useTranslations('Tools');
	const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>('');
	const workspaces = useWorkspacesStore(state => state.workspaces);
	const tools = useToolsStore(state => state.tools);
	
	const availableWorkspaces = workspaces.filter(workspace => {
		if (!tool) return true;
		const toolData = tools.find(t => t.manifest.id === tool.manifest.id);
		return !toolData?.workspaceIds?.includes(workspace.id);
	});

	const handleInstall = () => {
		if (selectedWorkspaceId && tool) {
			onInstall(selectedWorkspaceId);
			setSelectedWorkspaceId('');
			onOpenChange(false);
		}
	};

	const isFormValid = selectedWorkspaceId.trim().length > 0 && availableWorkspaces.length > 0;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{toolsTranslations('installToolDialog.title')}
					</DialogTitle>
					<DialogDescription>
						{toolsTranslations('installToolDialog.description')}
					</DialogDescription>
				</DialogHeader>
				<div className='grid mt-5 gap-4'>
					<div className='grid gap-3'>
						<Label htmlFor='workspace'>
							{toolsTranslations('installToolDialog.workspaceLabel')}
						</Label>
						<Select
							value={selectedWorkspaceId}
							onValueChange={setSelectedWorkspaceId}
						>
							<SelectTrigger>
								<SelectValue
									placeholder={toolsTranslations(
										'installToolDialog.workspacePlaceholder'
									)}
								/>
							</SelectTrigger>
							<SelectContent>
								{availableWorkspaces.length === 0 ? (
									<div className='p-2 text-sm text-muted-foreground'>
										{toolsTranslations('alreadyInstalledInAllWorkspaces')}
									</div>
								) : (
									availableWorkspaces.map(workspace => (
										<SelectItem key={workspace.id} value={workspace.id}>
											<div className='flex items-center gap-2'>
												<span>{workspace.name}</span>
												<span className='text-muted-foreground'>
													({workspace.description})
												</span>
											</div>
										</SelectItem>
									))
								)}
							</SelectContent>
						</Select>
					</div>
				</div>
				<DialogFooter>
					<Button variant='outline' onClick={() => onOpenChange(false)}>
						{toolsTranslations('installToolDialog.cancel')}
					</Button>
					<Button onClick={handleInstall} disabled={!isFormValid}>
						{toolsTranslations('installToolDialog.install')}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
