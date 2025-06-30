'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useWorkspacesStore } from '@/store/workspaces';
import InlineEditField from '@/components/inline-edit-field';
import { useTranslations } from 'next-intl';

type WorkspaceParams = {
	workspaceId: string;
};

export default function Workspace() {
	const { workspaceId } = useParams<WorkspaceParams>();
	const { workspaces, updateWorkspace } = useWorkspacesStore();
	const workspacesTranslations = useTranslations('Workspaces');
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
		return <div>{workspacesTranslations('workspaceNotFound')}</div>;
	}

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-col gap-4 mt-4'>
				<div className='max-w-1/4'>
					<InlineEditField
						value={workspace.name}
						onSave={handleUpdateName}
						placeholder={workspacesTranslations('createWorkspaceDialog.namePlaceholder')}
						maxLength={20}
						className='text-3xl font-bold'
					/>
				</div>
				<div className='max-w-1/4'>
					<InlineEditField
						value={workspace.description}
						onSave={handleUpdateDescription}
						placeholder={workspacesTranslations('createWorkspaceDialog.descriptionPlaceholder')}
						maxLength={50}
						className='text-muted-foreground'
					/>
				</div>
			</div>
		</div>
	);
}
