import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from '@/components/ui/dialog';

type DeleteDialogProps = {
	title: string;
	description: string;
	open: boolean;
	okButtonText: string;
	cancelButtonText: string;
	onOk: () => void;
	onCancel: () => void;
}

export default function DeleteDialog({
	title,
	description,
	open,
	okButtonText,
	cancelButtonText,
	onOk,
	onCancel,
}: DeleteDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onCancel}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>				
				<DialogFooter>
					<Button variant='outline' onClick={onCancel}>{cancelButtonText}</Button>
					<Button variant='destructive' onClick={onOk}>{okButtonText}</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}