import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { CheckIcon, EditIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type InlineEditFieldProps = {
	value: string;
	onSave: (value: string) => void;
	placeholder?: string;
	maxLength?: number;
	className?: string;
	disabled?: boolean;
};

export default function InlineEditField({
	value,
	onSave,
	placeholder,
	maxLength,
	className,
	disabled = false,
}: InlineEditFieldProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editValue, setEditValue] = useState(value);

	const startEdit = useCallback(() => {
		setEditValue(value);
		setIsEditing(true);
	}, [value]);

	const cancelEdit = useCallback(() => {
		setEditValue(value);
		setIsEditing(false);
	}, [value]);

	const saveEdit = useCallback(() => {
		if (editValue.trim().length > 0) {
			onSave(editValue.trim());
			setIsEditing(false);
		}
	}, [editValue, onSave]);

	const isValid =
		editValue.trim().length > 0 &&
		(!maxLength || editValue.trim().length <= maxLength);

	if (isEditing) {
		return (
			<div className={cn('flex items-center gap-2', className)}>
				<Input
					type='text'
					value={editValue}
					onChange={e => setEditValue(e.target.value)}
					placeholder={placeholder}
					maxLength={maxLength}
					onKeyDown={e => {
						if (e.key === 'Enter' && isValid) {
							saveEdit();
						} else if (e.key === 'Escape') {
							cancelEdit();
						}
					}}
					autoFocus
				/>
				{isValid && (
					<CheckIcon
						className='w-5 h-5 cursor-pointer text-green-500 hover:text-green-600'
						onClick={saveEdit}
					/>
				)}
				<XIcon
					className='w-5 h-5 cursor-pointer text-red-500 hover:text-red-600'
					onClick={cancelEdit}
				/>
			</div>
		);
	}

	return (
		<div className={cn('flex items-center gap-2', className)}>
			<span className='flex-1'>{value}</span>
			{!disabled && (
				<EditIcon
					className='w-5 h-5 cursor-pointer text-muted-foreground hover:text-foreground'
					onClick={startEdit}
				/>
			)}
		</div>
	);
}
