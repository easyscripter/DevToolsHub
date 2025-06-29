'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useWorkspacesStore } from '@/store/workspaces';
import InlineEditField from '@/components/inline-edit-field';
import { useTranslate } from '@/hooks/use-translate';

type WorkspaceParams = {
	workspaceId: string;
};

export default function Workspace() {
	const { t } = useTranslate();
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
		return <div>{t('Workspaces.workspaceNotFound')}</div>;
	}

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-col gap-4 mt-4'>
				<div className='max-w-1/4'>
					<InlineEditField
						value={workspace.name}
						onSave={handleUpdateName}
						placeholder={t('Workspaces.createWorkspaceDialog.namePlaceholder')}
						maxLength={20}
						className='text-3xl font-bold'
					/>
				</div>
				<div className='max-w-1/4'>
					<InlineEditField
						value={workspace.description}
						onSave={handleUpdateDescription}
						placeholder={t('Workspaces.createWorkspaceDialog.descriptionPlaceholder')}
						maxLength={50}
						className='text-muted-foreground'
					/>
				</div>
			</div>
		</div>
	);
}
