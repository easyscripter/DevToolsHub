'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { Label } from './ui/label';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';

type UploadToolDialogProps = {
	open: boolean;
	isUploading: boolean;
	maxFileSize?: number;
	onOpenChange: (open: boolean) => void;
	onUpload: (file: File) => void;
};

export default function UploadToolDialog({
	open,
	onOpenChange,
	isUploading,
	maxFileSize = 10 * 1024 * 1024,
	onUpload,
}: UploadToolDialogProps) {
	const toolsTranslations = useTranslations('Tools.uploadToolDialog');
	const [file, setFile] = useState<File | null>(null);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		if (acceptedFiles.length > 0) {
			setFile(acceptedFiles[0]);
		}
	}, []);

	const { getRootProps, getInputProps, isDragActive, isDragReject } =
		useDropzone({
			onDrop,
			accept: {
				'application/zip': ['.zip'],
			},
			maxFiles: 1,
			maxSize: maxFileSize,
		});

	const handleUpload = async () => {
		if (file) {
			onUpload(file);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader className='flex flex-col gap-5'>
					<DialogTitle>{toolsTranslations('title')}</DialogTitle>
					<DialogDescription className='text-justify'>
						{toolsTranslations('description')}
					</DialogDescription>
					<div className='flex flex-col gap-4'>
						<Label className='text-sm font-medium'>
							{toolsTranslations('zipFileLabel')}
						</Label>
						<div
							{...getRootProps()}
							className={cn(
								'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
								isDragActive && !isDragReject && 'border-blue-500 bg-blue-50',
								isDragReject && 'border-red-500 bg-red-50',
								!isDragActive && 'border-gray-300 hover:border-gray-400',
								file && 'border-green-500 bg-green-50'
							)}
						>
							<input {...getInputProps()} />
							{file ? (
								<div className='flex flex-col items-center gap-2'>
									<div className='text-green-600 font-medium'>
										{toolsTranslations('fileSelected')}
									</div>
									<div className='text-sm text-gray-600'>{file.name}</div>
									<div className='text-xs text-gray-500'>
										{(file.size / 1024 / 1024).toFixed(2)} MB
									</div>
								</div>
							) : isDragActive ? (
								<div className='text-blue-600 font-medium'>
									{isDragReject
										? toolsTranslations('invalidFileType')
										: toolsTranslations('dropFileHere')}
								</div>
							) : (
								<div className='flex flex-col items-center gap-2'>
									<div className='text-gray-600 font-medium'>
										{toolsTranslations('dragDropOrClick')}
									</div>
									<div className='text-sm text-gray-500'>
										{toolsTranslations('zipFilePlaceholder')}
									</div>
								</div>
							)}
						</div>
						{isDragReject && (
							<p className='text-sm text-red-500'>
								{toolsTranslations('invalidFileType')}
							</p>
						)}
					</div>
					<DialogFooter className='flex gap-4 mt-4'>
						<Button onClick={() => onOpenChange(false)} variant='outline'>
							{toolsTranslations('cancel')}
						</Button>
						<Button
							onClick={handleUpload}
							variant='default'
							disabled={!file || isUploading}
						>
							{isUploading
								? toolsTranslations('uploading')
								: toolsTranslations('upload')}
						</Button>
					</DialogFooter>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
