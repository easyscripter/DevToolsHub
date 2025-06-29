import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type AddNewCardProps = {
	title: string;
	description?: string;
	icon: React.ReactNode;
	onClick: () => void;
	className?: string;
};

export default function AddNewCard({
	title,
	description,
	icon,
	onClick,
	className,
}: AddNewCardProps) {
	return (
		<Card
			className={cn(
				'w-50 min-h-64 bg-white/10 backdrop-blur-md border-white/20 cursor-pointer flex flex-col justify-center items-center gap-4 hover:bg-white/20 transition-all duration-200',
				className,
			)}
			onClick={onClick}
		>
			<CardHeader className='flex flex-col items-center gap-4'>
				{icon}
			</CardHeader>
			<CardContent className='flex flex-col items-center gap-4'>
				<p className='text-center'>{title}</p>
				{description && <p className='text-center'>{description}</p>}
			</CardContent>
		</Card>
	);
}
