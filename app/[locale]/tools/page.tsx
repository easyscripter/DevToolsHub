'use client';

import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import UploadToolDialog from '@/components/upload-tool-dialog';
import InstallToolDialog from '@/components/install-tool-dialog';
import { useState } from 'react';
import { useToolsStore } from '@/store/tools';
import { useToolInstallation } from '@/hooks';
import ToolCard from '@/components/tool-card.';
import { Tool } from '@/types/tools';

export default function ToolsPage() {
	const toolsTranslations = useTranslations('Tools');
	const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
	const [installDialogOpen, setInstallDialogOpen] = useState(false);
	const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

	const tools = useToolsStore(state => state.tools);
	const { installTool } = useToolInstallation();

	const handleUpload = (file: File) => {
		console.log(file);
	};

	const handleInstallClick = (tool: Tool) => {
		setSelectedTool(tool);
		setInstallDialogOpen(true);
	};

	const handleInstall = (workspaceId: string) => {
		if (selectedTool) {
			installTool(selectedTool.manifest.id, workspaceId);
		}
	};

	return (
		<>
			<div className='flex flex-col gap-6'>
				<div className='flex flex-col gap-2'>
					<h1 className='text-3xl font-bold mt-4'>
						{toolsTranslations('title')}
					</h1>
					<p className='text-muted-foreground'>
						{toolsTranslations('description')}
					</p>
				</div>
				<div className='flex flex-col gap-8'>
					<div className='flex items-center'>
						<Input placeholder={toolsTranslations('searchToolsPlaceholder')} />
					</div>
					{/* TODO: Add tool cards */}
					{/* <div className='flex flex-col max-w-md gap-6'>
						<p className='text-muted-foreground'>
							{toolsTranslations('uploadToolLabel')}
						</p>
						<Button className='w-1/2' onClick={() => setOpen(true)}>
							<Upload className='w-4 h-4' />
							{toolsTranslations('uploadTool')}
						</Button>
					</div> */}
				</div>
				<div className='flex flex-wrap gap-4'>
					{tools.map(tool => (
						<ToolCard
							key={tool.manifest.id}
							name={tool.manifest.name}
							description={tool.manifest.description}
							iconSrc={tool.manifest.icon}
							author={tool.manifest.author}
							onInstall={() => handleInstallClick(tool)}
							version={tool.manifest.version}
						/>
					))}
				</div>
			</div>
			<UploadToolDialog
				open={uploadDialogOpen}
				onOpenChange={setUploadDialogOpen}
				isUploading={false}
				onUpload={handleUpload}
			/>
			<InstallToolDialog
				open={installDialogOpen}
				onOpenChange={setInstallDialogOpen}
				tool={selectedTool}
				onInstall={handleInstall}
			/>
		</>
	);
}
