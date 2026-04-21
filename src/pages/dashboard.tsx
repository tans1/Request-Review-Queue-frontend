import Filters, { type RequestFilters } from "../components/filters";
import Navbar from "../components/navbar";
import RequestTableRow, { type RequestListItem } from "../components/table-row";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NewRequest from "../components/forms/new-request";

export default function DashboardPage() {
  const handleFilterChange = (filters: RequestFilters) => {
    console.log(filters);
  };

  const demo: RequestListItem[] = [
    {
      id: "1",
      title: "Equipment replacement request",
      submitter: {
        id: "1",
        name: "Abebe",
      },
      owner: {
        id: "1",
        name: "Kebede",
      },
      priority: "low",
      status: "new",
      dueDate: "2026-10-01",
    },
    {
      id: "2",
      title: "Approve office internet reimbursement",
      submitter: { id: "2", name: "Hanna" },
      owner: { id: "5", name: "Lidiya" },
      priority: "high",
      status: "in review",
      dueDate: "2026-10-03",
    },
    {
      id: "3",
      title: "New software access for design team",
      submitter: { id: "3", name: "Samuel" },
      owner: { id: "6", name: "Meron" },
      priority: "medium",
      status: "needs info",
      dueDate: "2026-10-07",
    },
    {
      id: "4",
      title: "Business trip accommodation request",
      submitter: { id: "4", name: "Mahi" },
      owner: { id: "7", name: "Yonatan" },
      priority: "high",
      status: "approved",
      dueDate: "2026-10-09",
    },
    {
      id: "5",
      title: "Laptop repair approval",
      submitter: { id: "8", name: "Eden" },
      owner: { id: "9", name: "Kidus" },
      priority: "medium",
      status: "rejected",
      dueDate: "2026-10-10",
    },
    {
      id: "6",
      title: "Request for additional monitor",
      submitter: { id: "10", name: "Rahel" },
      owner: { id: "11", name: "Dawit" },
      priority: "low",
      status: "new",
      dueDate: "2026-10-12",
    },
    {
      id: "7",
      title: "Travel advance approval",
      submitter: { id: "12", name: "Martha" },
      owner: { id: "13", name: "Benyam" },
      priority: "high",
      status: "in review",
      dueDate: "2026-10-13",
    },
    {
      id: "8",
      title: "Stationery restock request",
      submitter: { id: "14", name: "Yonas" },
      owner: { id: "15", name: "Nahom" },
      priority: "low",
      status: "approved",
      dueDate: "2026-10-16",
    },
    {
      id: "9",
      title: "Vendor contract renewal",
      submitter: { id: "16", name: "Alem" },
      owner: { id: "17", name: "Netsanet" },
      priority: "medium",
      status: "needs info",
      dueDate: "2026-10-18",
    },
    {
      id: "10",
      title: "Cloud budget increase request",
      submitter: { id: "18", name: "Nathan" },
      owner: { id: "19", name: "Bethel" },
      priority: "high",
      status: "new",
      dueDate: "2026-10-19",
    },
    {
      id: "11",
      title: "Conference registration approval",
      submitter: { id: "20", name: "Bethany" },
      owner: { id: "21", name: "Henok" },
      priority: "medium",
      status: "in review",
      dueDate: "2026-10-20",
    },
    {
      id: "12",
      title: "Parking permit application",
      submitter: { id: "22", name: "Mikal" },
      owner: { id: "23", name: "Ruth" },
      priority: "low",
      status: "approved",
      dueDate: "2026-10-22",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="w-full flex flex-row-reverse mt-5">
        <NewRequest />
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5">
        <div className="text-3xl font-medium">Requests</div>
        <Filters onFiltersChange={handleFilterChange} />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pb-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <Table>
            <TableHeader className="border-none">
              <TableRow className="bg-slate-100">
                <TableHead className="w-22.5 px-4 py-3">No.</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Submitter</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-4">Due date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demo.map((request, index) => (
                <RequestTableRow
                  key={request.id}
                  request={request}
                  index={index}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
