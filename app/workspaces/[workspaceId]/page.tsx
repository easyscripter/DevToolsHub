'use client';

import { Input } from '@/components/ui/input';
import { useWorkspacesStore } from '@/store/workspaces';
import { CheckIcon, EditIcon, XIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

type WorkspaceParams = {
	workspaceId: string;
};

export default function Workspace() {
	const { workspaceId } = useParams<WorkspaceParams>();
	const { workspaces, updateWorkspace } = useWorkspacesStore();
	const [isEditingName, setIsEditingName] = useState(false);
	const [isEditingDescription, setIsEditingDescription] = useState(false);

	const workspace = workspaces.find(workspace => workspace.id === workspaceId);

	const [workspaceName, setWorkspaceName] = useState(workspace?.name);
	const [workspaceDescription, setWorkspaceDescription] = useState(
		workspace?.description
	);

	if (!workspace) {
		return <div>Workspace not found</div>;
	}

	const handleUpdateWorkspaceName = () => {
		updateWorkspace({
			...workspace,
			name: workspaceName || '',
		});
		setIsEditingName(false);
	};

	const handleCancelEdit = () => {
		setWorkspaceName(workspace.name);
		setIsEditingName(false);
	};

	const handleStartEdit = () => {
		setWorkspaceName(workspace.name);
		setIsEditingName(true);
	};

	const handleUpdateWorkspaceDescription = () => {
		updateWorkspace({
			...workspace,
			description: workspaceDescription || '',
		});
		setIsEditingDescription(false);
	};

	const handleCancelEditDescription = () => {
		setWorkspaceDescription(workspace.description);
		setIsEditingDescription(false);
	};

	const handleStartEditDescription = () => {
		setWorkspaceDescription(workspace.description);
		setIsEditingDescription(true);
	};

	const isValidationName = workspaceName && workspaceName.length > 0;
	const isValidationDescription =
		workspaceDescription && workspaceDescription.length > 0;

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-col gap-2 mt-4'>
				<div className='flex max-w-1/4 items-center gap-4'>
					{isEditingName ? (
						<>
							<Input
								type='text'
								value={workspaceName}
								onChange={e => setWorkspaceName(e.target.value)}
							/>
							{isValidationName && (
								<CheckIcon
									className='w-5 h-5 cursor-pointer'
									onClick={handleUpdateWorkspaceName}
								/>
							)}
							<XIcon
								className='w-5 h-5 cursor-pointer'
								onClick={handleCancelEdit}
							/>
						</>
					) : (
						<>
							<h1 className='text-3xl font-bold'>{workspace.name}</h1>
							{!isEditingDescription && (
								<EditIcon
									className='w-5 h-5 cursor-pointer mt-2'
									onClick={handleStartEdit}
								/>
							)}
						</>
					)}
				</div>
				<div className='flex max-w-1/4 items-center gap-4'>
					{isEditingDescription ? (
						<>
							<Input
								type='text'
								value={workspaceDescription}
								onChange={e => setWorkspaceDescription(e.target.value)}
							/>
							{isValidationDescription && (
								<CheckIcon
									className='w-5 h-5 cursor-pointer'
									onClick={handleUpdateWorkspaceDescription}
								/>
							)}
							<XIcon
								className='w-5 h-5 cursor-pointer'
								onClick={handleCancelEditDescription}
							/>
						</>
					) : (
						<>
							<p className='text-muted-foreground'>{workspace.description}</p>
							{!isEditingName && (
								<EditIcon
									className='w-5 h-5 cursor-pointer'
									onClick={handleStartEditDescription}
								/>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
