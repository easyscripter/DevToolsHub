'use client';

import { useParams } from 'next/navigation';
import { useToolsStore } from '@/store/tools';
import { useTranslations } from 'next-intl';

type ToolParams = {
	toolId: string;
};

export default function ToolPage() {
	const { toolId } = useParams<ToolParams>();
	const { tools } = useToolsStore();
	const toolsTranslations = useTranslations('Tools');
	
	const tool = tools.find(t => t.manifest.id === toolId);

	if (!tool) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<div className='text-center'>
					<h1 className='text-2xl font-bold mb-4'>{toolsTranslations('toolNotFound')}</h1>
					<p className='text-muted-foreground'>
						{toolsTranslations('toolNotFoundDescription')}
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='h-screen flex flex-col'>
			<div className='flex items-center justify-between p-4 border-b bg-background'>
				<div className='flex items-center gap-3'>
					<h1 className='text-xl font-semibold'>{tool.manifest.name}</h1>
					<span className='text-sm text-muted-foreground'>
						v{tool.manifest.version}
					</span>
				</div>
				<div className='text-sm text-muted-foreground'>
					by {tool.manifest.author}
				</div>
			</div>
			<div className='flex-1'>
				<iframe
					src={tool.manifest.entrypoint}
					className='w-full h-full border-0'
					title={tool.manifest.name}
					sandbox='allow-scripts allow-same-origin allow-forms allow-popups'
				/>
			</div>
		</div>
	);
} 