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
	const [isEditing, setIsEditing] = useState(false);

	const workspace = workspaces.find(workspace => workspace.id === workspaceId);

	const [workspaceName, setWorkspaceName] = useState(workspace?.name);

	if (!workspace) {
		return <div>Workspace not found</div>;
	}

	const handleUpdateWorkspaceName = () => {
		updateWorkspace({
			...workspace,
			name: workspaceName || '',
		});
		setIsEditing(false);
	};

	const handleCancelEdit = () => {
		setWorkspaceName(workspace.name);
		setIsEditing(false);
	};

	const handleStartEdit = () => {
		setWorkspaceName(workspace.name);
		setIsEditing(true);
	};

	const isValidation = workspaceName && workspaceName.length > 0;

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-col gap-2 mt-4'>
				<div className='flex max-w-1/4 items-center gap-4'>
					{isEditing ? (
						<>
							<Input
								type='text'
								value={workspaceName}
								onChange={e => setWorkspaceName(e.target.value)}
							/>
							{isValidation && (
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
							<EditIcon
								className='w-5 h-5 cursor-pointer mt-2'
								onClick={handleStartEdit}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
