'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useWorkspacesStore } from '@/store/workspaces';
import InlineEditField from '@/components/inline-edit-field';

type WorkspaceParams = {
	workspaceId: string;
};

export default function Workspace() {
	const { workspaceId } = useParams<WorkspaceParams>();
	const { workspaces, updateWorkspace } = useWorkspacesStore();

	const workspace = workspaces.find(workspace => workspace.id === workspaceId);
	
	const handleUpdateName = (name: string) => {
		if (workspace) {
			updateWorkspace({
				...workspace,
				name,
			});
		}
	};

	const handleUpdateDescription = (description: string) => {
		if (workspace) {
			updateWorkspace({
				...workspace,
				description,
			});
		}
	};

	if (!workspace) {
		return <div>Workspace not found</div>;
	}

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-col gap-4 mt-4'>
				<div className='max-w-1/4'>
					<InlineEditField
						value={workspace.name}
						onSave={handleUpdateName}
						placeholder='Enter workspace name...'
						maxLength={20}
						className='text-3xl font-bold'
					/>
				</div>
				<div className='max-w-1/4'>
					<InlineEditField
						value={workspace.description}
						onSave={handleUpdateDescription}
						placeholder='Enter workspace description...'
						maxLength={50}
						className='text-muted-foreground'
					/>
				</div>
			</div>
		</div>
	);
}
