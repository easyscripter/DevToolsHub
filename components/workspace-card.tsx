import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { TrashIcon } from 'lucide-react';

type WorkspaceCardProps = {
	id: string;
	icon: React.ReactElement;
	name: string;
	description: string;
	onDelete: (id: string) => void;
};

export default function WorkspaceCard({
	id,
	icon,
	name,
	description,
	onDelete,
}: WorkspaceCardProps) {
	return (
		<Card className='gap-4 w-50 min-h-64 p-4 flex flex-col'>
			<CardHeader className='flex flex-col items-center gap-4 flex-shrink-0'>
				{icon}
				<CardTitle className='text-center font-bold text-lg'>{name}</CardTitle>
			</CardHeader>
			<CardContent className='flex-1 flex flex-col justify-center'>
				<p className='text-center text-muted-foreground'>{description}</p>
			</CardContent>
			<CardFooter className='flex-shrink-0'>
				<Button
					size='sm'
					variant='destructive'
					className='w-full'
					onClick={() => onDelete(id)}
				>
					<TrashIcon className='w-4 h-4' />
				</Button>
			</CardFooter>
		</Card>
	);
}
