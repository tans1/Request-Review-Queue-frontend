import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  NewRequestSchema,
  RequestPriorityValues,
  RequestStatusValues,
} from "@/features/requests/request.schema";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import * as z from "zod";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createRequest,
  editRequest,
  getOwners,
} from "../../features/requests/api";

type FieldErrors = {
  title?: string;
  note?: string;
  owner?: string;
  dueDate?: string;
  status?: string;
  priority?: string;
};
type FieldName = "title" | "note" | "owner" | "dueDate" | "status" | "priority";

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const INITIAL_FORM_DATA = {
  title: "",
  note: "",
  owner: "",
  dueDate: "",
  status: "NEW",
  priority: "",
};

type ExistingRequest = {
  id: string;
  title: string;
  owner: string;
  dueDate: string;
  status: string;
  priority: string;
};

type Payload = {
  label?: string;
  title?: string;
  existingRequest?: ExistingRequest;
};

export default function NewRequest({ label, title, existingRequest }: Payload) {
  // console.log(existingRequest)
  const [open, setOpen] = useState(false);
  const [isDueDatePickerOpen, setIsDueDatePickerOpen] = useState(false);
  function getFormData(existingRequest?: ExistingRequest) {
    return {
      title: existingRequest?.title ?? "",
      note: "",
      owner: existingRequest?.owner ?? "",
      dueDate: existingRequest?.dueDate ?? "",
      status: existingRequest?.status ?? "NEW",
      priority: existingRequest?.priority ?? "LOW",
    };
  }

  const [formData, setFormData] = useState(() => getFormData(existingRequest));
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ["owners"], queryFn: getOwners });
  const mutation = useMutation({
    mutationFn: existingRequest ? editRequest : createRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["request"] });
      toast.info(existingRequest ? "Request Updated" : "Request created", {
        position: "top-right",
      });
    },
    onError: (error) => {
      console.log("not able to create a request:- ", error);
      toast.error("Not able to create", {
        position: "top-right",
      });
    },
  });

  const handleChange = (field: FieldName, value: string) => {
    setFieldErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (nextOpen) {
      setFormData(getFormData(existingRequest));
      setFieldErrors({});
    }
  };

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    const validation = NewRequestSchema.safeParse(formData);

    if (!validation.success) {
      const tree = z.treeifyError(validation.error);
      setFieldErrors({
        title: tree.properties?.title?.errors.at(0),
        note: tree.properties?.note?.errors.at(0),
        owner: tree.properties?.owner?.errors.at(0),
        status: tree.properties?.status?.errors.at(0),
      });
      return;
    }

    const payload = {
      ...validation.data,
      ...(formData.dueDate
        ? { dueDate: new Date(formData.dueDate).toISOString() }
        : {}),
      ...(formData.priority ? { priority: formData.priority } : {}),
      ownerId: validation.data.owner,
    };

    try {
      mutation.mutate({
        ...payload,
        ...(existingRequest ? { id: existingRequest.id } : {}),
      });
      setFieldErrors({});
      // setFormData(() => getFormData(existingRequest));
    } catch (err) {
      console.log(err);
    } finally {
      setIsDueDatePickerOpen(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" className="cursor-pointer bg-blue-500 text-white">
          {label ? label : "New request"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title ? title : "New request"}</DialogTitle>
          </DialogHeader>
          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <Field className="sm:col-span-2">
              <Label htmlFor="request-title">
                Title <span className="text-red-500">*</span>{" "}
              </Label>
              <Input
                id="request-title"
                name="title"
                placeholder="Title.."
                value={formData.title}
                onChange={(event) => handleChange("title", event.target.value)}
              />
              <FieldError errors={[{ message: fieldErrors.title }]} />
            </Field>
            <Field>
              <Label htmlFor="owner-name">Owner</Label>
              <NativeSelect
                id="owner-name"
                name="ownerId"
                className="w-full"
                value={formData.owner}
                onChange={(event) => handleChange("owner", event.target.value)}>
                <NativeSelectOption value="">Select owner</NativeSelectOption>
                {query.data?.data.map((owner) => (
                  <NativeSelectOption key={owner?.id} value={owner?.id}>
                    {owner?.name}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              <FieldError errors={[{ message: fieldErrors.owner }]} />
            </Field>

            <Field>
              <Label htmlFor="due-date">Due date</Label>
              <Popover
                open={isDueDatePickerOpen}
                onOpenChange={setIsDueDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="due-date"
                    type="button"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dueDate && "text-muted-foreground",
                    )}>
                    <CalendarIcon className="mr-2 size-4" />
                    {formData.dueDate || "Select due date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.dueDate
                        ? new Date(`${formData.dueDate}`)
                        : undefined
                    }
                    onSelect={(date) => {
                      if (!date) return;
                      handleChange("dueDate", formatDate(date));
                      setIsDueDatePickerOpen(false);
                    }}
                  />
                  <div className="flex justify-end p-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        handleChange("dueDate", "");
                        setIsDueDatePickerOpen(false);
                      }}>
                      Clear date
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <FieldError errors={[{ message: fieldErrors.dueDate }]} />
            </Field>

            <Field>
              <Label htmlFor="request-status">
                Status <span className="text-red-500">*</span>
              </Label>
              <NativeSelect
                id="request-status"
                name="status"
                className="w-full"
                value={formData.status}
                onChange={(event) =>
                  handleChange("status", event.target.value)
                }>
                {/* <NativeSelectOption value="">Select Status</NativeSelectOption> */}
                {RequestStatusValues.map((status) => (
                  <NativeSelectOption key={status} value={status}>
                    {status}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              <FieldError errors={[{ message: fieldErrors.status }]} />
            </Field>

            <Field>
              <Label htmlFor="request-priority">
                Priority <span className="text-red-500">*</span>
              </Label>
              <NativeSelect
                id="request-priority"
                name="priority"
                className="w-full"
                value={formData.priority}
                onChange={(event) =>
                  handleChange("priority", event.target.value)
                }>
                {/* <NativeSelectOption value="">
                  Select Priority
                </NativeSelectOption> */}
                {RequestPriorityValues.map((priority) => (
                  <NativeSelectOption key={priority} value={priority}>
                    {priority}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              <FieldError errors={[{ message: fieldErrors.priority }]} />
            </Field>

            <Field className="sm:col-span-2 mb-4">
              <Label htmlFor="request-note">Note</Label>
              <textarea
                id="request-note"
                name="note"
                value={formData.note}
                onChange={(event) => handleChange("note", event.target.value)}
                placeholder="note..."
                className="min-h-28 w-full rounded-lg px-2.5 py-2 text-sm outline-none border"
              />
              <FieldError errors={[{ message: fieldErrors.note }]} />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Creating..." : "Create request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
