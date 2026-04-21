import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  addNote,
  assignOwner,
  changeStatus,
  getOwners,
  getRequestById,
} from "../features/requests/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NewRequest from "../components/forms/new-request";
import { Field } from "../components/ui/field";
import { toast } from "sonner";

type RequestStatus =
  | "NEW"
  | "IN_REVIEW"
  | "NEEDS_INFO"
  | "APPROVED"
  | "REJECTED";
type RequestPriority = "LOW" | "MEDIUM" | "HIGH";

const PRIORITY_STYLES: Record<RequestPriority, string> = {
  LOW: "bg-emerald-50 text-emerald-700",
  MEDIUM: "bg-amber-50 text-amber-700",
  HIGH: "bg-rose-50 text-rose-700",
};

const STATUS_STYLES: Record<RequestStatus, string> = {
  NEW: "bg-slate-100 text-slate-700",
  IN_REVIEW: "bg-sky-50 text-sky-700",
  NEEDS_INFO: "bg-violet-50 text-violet-700",
  APPROVED: "bg-emerald-50 text-emerald-700",
  REJECTED: "bg-rose-50 text-rose-700",
};

const STATUS_OPTIONS: RequestStatus[] = [
  "NEW",
  "IN_REVIEW",
  "NEEDS_INFO",
  "APPROVED",
  "REJECTED",
];

export default function RequestDetailsPage() {
  const [searchParams] = useSearchParams();
  const requestId = searchParams.get("id") ?? "12";

  const [newNote, setNewNote] = useState("");
  const [selectedOwnerId, setSelectedOwnerId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  const requestQuery = useQuery({
    queryKey: ["request"],
    queryFn: () => getRequestById(requestId),
  });
  const ownersQuery = useQuery({ queryKey: ["owners"], queryFn: getOwners });
  const queryClient = useQueryClient();
  const assignOwnerMutation = useMutation({
    mutationFn: assignOwner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request"] });
      setSelectedOwnerId("");
    },
    onError: (error) => {
      console.log("not able to assing owner to a request:- ", error);
      toast.error( error.message ?? "Error occured", {
        position: "top-right",
      });
    },
  });

  const changeStatusMutation = useMutation({
    mutationFn: changeStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request"] });
      setSelectedStatus("");
      setRejectionReason("")
    },
    onError: (error) => {
      console.log("not able to change a request status:- ", error);
      toast.error( error.message ?? "Error occured", {
        position: "top-right",
      });
    },
  });

  const noteMutation = useMutation({
    mutationFn: addNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request"] });
      setNewNote("");
    },
    onError: (error) => {
      console.log("not able to create a request note:- ", error);
      toast.error( error.message ?? "Error occured", {
        position: "top-right",
      });
    },
  });

  const handleAssign = () => {
    assignOwnerMutation.mutate({
      requestId,
      ownerId: selectedOwnerId,
    });
  };

  const handleStatusUpdate = () => {
    changeStatusMutation.mutate({
      requestId,
      newStatus: selectedStatus,
      rejectionReason,
    });
  };

  const handleAddNote = () => {
    const trimmed = newNote.trim();
    if (!trimmed) {
      return;
    }

    noteMutation.mutate({
      requestId,
      note: newNote,
    });
  };

  console.log("the request: details :----", requestQuery.data?.data);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-black">
              {requestQuery.data?.data?.title}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Submitted by {requestQuery.data?.data?.submitter.name}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex rounded-full px-2 py-1 text-xs font-semibold capitalize border border-gray-300",
                PRIORITY_STYLES[requestQuery.data?.data?.priority],
              )}>
              {requestQuery.data?.data?.priority} priority
            </span>
            <span
              className={cn(
                "inline-flex rounded-full px-2 py-1 text-xs font-semibold capitalize  border border-gray-300",
                STATUS_STYLES[requestQuery.data?.data?.status],
              )}>
              {requestQuery.data?.data?.status}
            </span>
            <NewRequest
              label="Edit"
              title="Edit Request"
              existingRequest={{
                id: requestQuery.data?.data?.id,
                title: requestQuery.data?.data?.title,
                owner: requestQuery.data?.data?.owner?.id,
                dueDate: requestQuery.data?.data?.dueDate,
                status: requestQuery.data?.data?.status,
                priority: requestQuery.data?.data?.priority,
              }}
            />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
          <div className="space-y-4">
            <Card className="border border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Request details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <div className="text-slate-500">Owner</div>
                    <div className="font-medium text-slate-800">
                      {requestQuery.data?.data?.owner?.name}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500">Required Fields</div>
                    <div className="font-medium text-slate-800">
                      {requestQuery.data?.data?.requiredFieldsComplete
                        ? "Complete"
                        : "Not complete"}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500">Created date</div>
                    <div className="font-medium text-slate-800">
                      {new Date(
                        requestQuery.data?.data?.createdAt,
                      ).toDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500">Due date</div>
                    <div className="font-medium text-slate-800">
                      {requestQuery.data?.data?.dueDate
                        ? new Date(
                            requestQuery.data?.data?.dueDate,
                          ).toDateString()
                        : "Not set"}
                    </div>
                  </div>
                </div>

                {requestQuery.data?.data?.rejectionReason && (
                  <div className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-slate-700 text-left">
                    <span className="font-medium">Rejection reason :</span>{" "}
                    {requestQuery.data?.data?.rejectionReason}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {requestQuery.data?.data?.notes.map((note) => (
                  <div
                    key={note.id}
                    className="rounded-lg border border-slate-200 p-3">
                    <div className="mb-1 text-xs text-slate-500">
                      By {note.author.name}
                    </div>
                    <p className="text-sm text-slate-700">{note.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Activity history</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {requestQuery.data?.data?.history.map((history) => (
                  <div
                    key={history.id}
                    className="flex items-start justify-between gap-3 rounded-lg border border-slate-200 p-3 text-sm">
                    <div className="text-slate-700">{history.type}</div>
                    <div className="shrink-0 text-xs text-slate-500">
                      {history.createdAt}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-4 border border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Make changes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="assign-owner">Assign owner</Label>
                  <NativeSelect
                    id="assign-owner"
                    className="w-full"
                    value={selectedOwnerId}
                    onChange={(event) =>
                      setSelectedOwnerId(event.target.value)
                    }>
                    <NativeSelectOption key="1" value="">
                      Select owner
                    </NativeSelectOption>
                    {ownersQuery.data?.data.map((owner) => (
                      <NativeSelectOption key={owner.id} value={owner.id}>
                        {owner.name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  <Button
                    type="button"
                    className="w-full"
                    onClick={handleAssign}
                    disabled={!selectedOwnerId}>
                    Save assignment
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="request-status">Update status</Label>
                  <NativeSelect
                    id="request-status"
                    className="w-full"
                    value={selectedStatus}
                    onChange={(event) =>
                      setSelectedStatus(event.target.value as RequestStatus)
                    }>
                    <NativeSelectOption key="1" value="">
                      Select status
                    </NativeSelectOption>
                    {STATUS_OPTIONS.map((option) => (
                      <NativeSelectOption key={option} value={option}>
                        {option}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                  {selectedStatus == "REJECTED" && (
                    <Field className="sm:col-span-2 mb-4">
                      <Label htmlFor="request-rejectionReason">
                        Rejection Reason
                      </Label>
                      <textarea
                        id="request-rejectionReason"
                        name="rejectionReason"
                        value={rejectionReason}
                        onChange={(event) =>
                          setRejectionReason(event.target.value)
                        }
                        placeholder="Reason..."
                        className="min-h-28 w-full rounded-lg px-2.5 py-2 text-sm outline-none border"
                      />
                    </Field>
                  )}
                  <Button
                    type="button"
                    className="w-full"
                    onClick={handleStatusUpdate}
                    disabled={
                      (selectedStatus == "REJECTED" && !rejectionReason) ||
                      !selectedStatus
                    }>
                    Save status
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note-input">Add note</Label>
                  <Input
                    id="note-input"
                    value={newNote}
                    onChange={(event) => setNewNote(event.target.value)}
                    placeholder="Write a short note..."
                  />
                  <Button
                    type="button"
                    className="w-full"
                    onClick={handleAddNote}
                    disabled={!newNote}>
                    Add note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
