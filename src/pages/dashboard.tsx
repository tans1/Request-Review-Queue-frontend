import Filters, { type RequestFilters } from "../components/filters";
import Navbar from "../components/navbar";
import RequestTableRow from "../components/table-row";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NewRequest from "../components/forms/new-request";
import { useQuery } from "@tanstack/react-query";
import { getRequests } from "../features/requests/api";
import { useState } from "react";

export default function DashboardPage() {
  const [filters, setFilters] = useState<RequestFilters>({
    status: "",
    priority: "",
    dueDate: "",
    owner: "",
    search: "",
    next_due: false,
  });

  const query = useQuery({
    queryKey: ["requests", filters],
    queryFn: () => getRequests(filters),
  });

  const handleFilterChange = (newFilters: RequestFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        searchValue={filters.search}
        handleSearchValueChange={(value) => {
          setFilters((current) => ({
            ...current,
            search: value,
          }));
        }}
      />
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5">
        <div className="text-3xl font-medium">Requests</div>
        <NewRequest />
      </div>

      <div className=" flex justify-start my-5 px-5">
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
              {query.data?.data.map((request, index) => (
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
