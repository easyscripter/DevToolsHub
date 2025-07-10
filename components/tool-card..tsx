import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import Image from 'next/image';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';

type ToolCardProps = {
	name: string;
	description: string;
	iconSrc: string;
	author: string;
	onInstall: () => void;
	variant?: 'install' | 'workspace';
	onRun?: () => void;
	onUninstall?: () => void;
	version: string;
};

export default function ToolCard({
	name,
	description,
	iconSrc,
	author,
	onInstall,
	variant = 'install',
	onRun,
	onUninstall,
	version
}: ToolCardProps) {
	const toolsTranslations = useTranslations('Tools');

	return (
		<Card className='md:w-120'>
			<CardHeader className='flex items-center justify-between'>
				<CardTitle className='flex items-center gap-4'>
					<Image src={iconSrc} alt={name} width={32} height={32} />
					<p className='text-md font-bold text-foreground'>{name}</p>
				</CardTitle>
				{variant === 'install' ? (
					<Button
						className='bg-gradient-to-bl from-primary to-primary/80 text-primary-foreground py-1 px-2'
						onClick={onInstall}
					>
						{toolsTranslations('install')}
					</Button>
				) : (
					<div className='flex gap-2'>
						<Button
							size='sm'
							onClick={onRun}
						>
							{toolsTranslations('run')}
						</Button>
						<Button
							size='sm'
							variant='outline'
							onClick={onUninstall}
						>
							{toolsTranslations('uninstall')}
						</Button>
					</div>
				)}
			</CardHeader>
			<CardContent>
				<CardDescription className='text-md text-muted-foreground'>
					{description}
				</CardDescription>
			</CardContent>
			<CardFooter className='flex justify-between'>
				<p className='text-sm text-muted-foreground flex items-center gap-2'>
					Author: <span className='font-bold'>{author}</span>
				</p>
				<p className='text-sm text-muted-foreground flex items-center gap-2'>
					Version: <span className='font-bold'>{version}</span>
				</p>
			</CardFooter>
		</Card>
	);
}
