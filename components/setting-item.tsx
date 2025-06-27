import { ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

type SettingItemProps = {
	title: string;
	description: string;
	children: ReactNode;
};

export function SettingItem({
	title,
	description,
	children,
}: SettingItemProps) {
	return (
		<div className='flex flex-col space-y-8'>
			<Separator/>
			<div className='flex w-full justify-between items-center'>
				<div className='flex flex-col space-y-4'>
					<Label className='text-md font-semibold leading-none'>{title}</Label>
					<p className='text-sm text-muted-foreground'>{description}</p>
				</div>
				<div className='flex items-center'>{children}</div>
			</div>
			<Separator/>
		</div>
	);
}
