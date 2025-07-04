'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import UploadToolDialog from '@/components/upload-tool-dialog';
import { useState } from 'react';

export default function ToolsPage() {
	const toolsTranslations = useTranslations('Tools');
	const [open, setOpen] = useState(false);

	const handleUpload = (file: File) => {
		console.log(file);
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
					<div className='flex flex-col max-w-md gap-6'>
						<p className='text-muted-foreground'>
							{toolsTranslations('uploadToolLabel')}
						</p>
						<Button className='w-1/2' onClick={() => setOpen(true)}>
							<Upload className='w-4 h-4' />
							{toolsTranslations('uploadTool')}
						</Button>
					</div>
				</div>
			</div>
			<UploadToolDialog
				open={open}
				onOpenChange={setOpen}
				isUploading={false}
				onUpload={handleUpload}
			/>
		</>
	);
}
