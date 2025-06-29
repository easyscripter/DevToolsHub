'use client';

import WorkspaceCard from '@/components/workspace-card';
import WorkspaceDialog from '@/components/workspace-dialog';
import { useWorkspacesStore } from '@/store/workspaces';
import React, { useState } from 'react';
import { FolderIcon, PlusIcon } from 'lucide-react';
import { workspaceIcons } from '@/config';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Workspace } from '@/types/workspace';
import { Button } from '@/components/ui/button';
import DeleteDialog from '@/components/delete-dialog';
import { useRouter } from 'next/navigation';

export default function Workspaces() {
	const { workspaces, createWorkspace, deleteWorkspace } = useWorkspacesStore();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [workspaceIdToDelete, setWorkspaceIdToDelete] = useState<string | null>(null);
	const router = useRouter();
	const getIconComponent = (iconName: string) => {
		const iconOption = workspaceIcons.find(icon => icon.value === iconName);
		return iconOption ? iconOption.icon : FolderIcon;
	};

	const handleCreateWorkspace = (workspace: Workspace) => {
		createWorkspace(workspace);
		setIsDialogOpen(false);
	};

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-col gap-2'>
				<h1 className='text-3xl font-bold mt-4'>Workspaces</h1>
				<p className='text-muted-foreground'>Manage your workspaces</p>
			</div>
			<div className='flex gap-4 w-full flex-wrap'>
				{workspaces.length > 0 ? (
					<>
						{workspaces.map(workspace => (
							<WorkspaceCard
								key={workspace.id}
								id={workspace.id}
								icon={React.createElement(getIconComponent(workspace.icon), {
									className: 'w-10 h-10',
								})}
								name={workspace.name}
								description={workspace.description}
								onDelete={() => {
									setWorkspaceIdToDelete(workspace.id);
									setIsDeleteDialogOpen(true);
								}}
								onClick={() => router.push(`/workspaces/${workspace.id}`)}
							/>
						))}
						<Card 
							className='w-50 min-h-64 bg-white/10 backdrop-blur-md border-white/20 cursor-pointer flex flex-col justify-center items-center gap-4 hover:bg-white/20 transition-all duration-200'
							onClick={() => setIsDialogOpen(true)}
						>
							<CardHeader className='flex flex-col items-center gap-4'>
								<PlusIcon className='w-10 h-10' />
							</CardHeader>
							<CardContent className='flex flex-col items-center gap-4'>
								<p className='text-center'>
									Create a new workspace
								</p>
							</CardContent>
						</Card>
					</>
				) : (
					<div className='flex flex-col gap-8'>
						<p className='text-muted-foreground'>No workspaces found</p>
						<Button 
							size='sm' 
							onClick={() => setIsDialogOpen(true)}
							className='w-fit'
						>
							<PlusIcon className='w-4 h-4 mr-2' />
							Create Workspace
						</Button>
					</div>
				)}
			</div>
			<WorkspaceDialog 
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				onCreateWorkspace={handleCreateWorkspace}
			/>
			<DeleteDialog
				title='Delete Workspace'
				description='Are you sure you want to delete this workspace?'
				open={isDeleteDialogOpen}
				okButtonText='Delete'
				cancelButtonText='Cancel'
				onOk={() => {
					deleteWorkspace(workspaceIdToDelete!);
					setIsDeleteDialogOpen(false);
				}}
				onCancel={() => setIsDeleteDialogOpen(false)}
			/>
		</div>
	);
}
