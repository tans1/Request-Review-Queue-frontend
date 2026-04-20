import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export type RequestListItem = {
  id: string;
  title: string;
  submitter: {
    id: string;
    name: string;
  };
  owner: {
    id: string;
    name: string;
  };
  priority: "low" | "medium" | "high";
  status: "new" | "in review" | "needs info" | "approved" | "rejected";
  dueDate: string;
};

type RequestTableRowProps = {
  request: RequestListItem;
  index: number;
};

const PRIORITY_STYLES: Record<RequestListItem["priority"], string> = {
  low: "bg-emerald-50 text-emerald-700",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-rose-50 text-rose-700",
};

const STATUS_STYLES: Record<RequestListItem["status"], string> = {
  new: "bg-slate-100 text-slate-700",
  "in review": "bg-sky-50 text-sky-700",
  "needs info": "bg-violet-50 text-violet-700",
  approved: "bg-emerald-50 text-emerald-700",
  rejected: "bg-rose-50 text-rose-700",
};

export default function RequestTableRow({ request, index }: RequestTableRowProps) {
  const navigate = useNavigate();

  const handleOpenDetails = () => {
    navigate(`/details?id=${request.id}`);
  };

  return (
    <TableRow
      role="button"
      tabIndex={0}
      onClick={handleOpenDetails}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleOpenDetails();
        }
      }}
      className="cursor-pointer border-b border-slate-100 transition hover:bg-slate-50 text-left"
    >
      <TableCell className="font-medium text-slate-700">#{index + 1}</TableCell>
      <TableCell className="max-w-[18rem] truncate font-medium text-slate-900">
        {request.title}
      </TableCell>
      <TableCell className="text-slate-600">{request.submitter.name}</TableCell>
      <TableCell className="text-slate-600">{request.owner.name}</TableCell>
      <TableCell>
        <span
          className={cn(
            "inline-flex rounded-full px-2 py-1 text-xs font-semibold capitalize",
            PRIORITY_STYLES[request.priority],
          )}
        >
          {request.priority}
        </span>
      </TableCell>
      <TableCell>
        <span
          className={cn(
            "inline-flex rounded-full px-2 py-1 text-xs font-semibold capitalize",
            STATUS_STYLES[request.status],
          )}
        >
          {request.status}
        </span>
      </TableCell>
      <TableCell className="text-slate-600">{request.dueDate}</TableCell>
    </TableRow>
  );
}
