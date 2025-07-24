import { ChangeLog } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type ChangeLogModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  changeLog: ChangeLog | null;
};

export function ChangeLogModal({
  open,
  onClose,
  title,
  changeLog,
}: ChangeLogModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{changeLog?.version}</DialogDescription>
        </DialogHeader>
        <ul className="mt-2 px-2 flex flex-col gap-3 list-none">
          {changeLog?.changelog.map((change, index) => (
            <li className="before:content-['-'] before:mr-2" key={index}>
              {change}
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
