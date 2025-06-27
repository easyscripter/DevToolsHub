import { ReactNode } from 'react';

type SettingCategoryProps = {
	title: string;
	children: ReactNode;
};

export function SettingCategory({
	title,
	children,
}: SettingCategoryProps) {
	return (
		<div className='flex flex-col gap-8'>
			<div className='flex flex-col gap-2'>
				<h2 className='text-xl capitalize font-semibold'>{title}</h2>
			</div>
			<div className='flex flex-col gap-6'>{children}</div>
		</div>
	);
}
