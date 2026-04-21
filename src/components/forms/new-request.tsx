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
  type NewRequestInput,
} from "@/features/requests/request.schema";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import * as z from "zod";
import { toast } from "sonner";

type FieldErrors = Partial<Record<keyof NewRequestInput, string>>;
type FieldName = keyof NewRequestInput;

const OWNER_OPTIONS = [
  { id: "1", name: "Kebede" },
  { id: "5", name: "Lidiya" },
  { id: "6", name: "Meron" },
  { id: "7", name: "Yonatan" },
  { id: "9", name: "Kidus" },
  { id: "11", name: "Dawit" },
  { id: "13", name: "Benyam" },
  { id: "15", name: "Nahom" },
  { id: "17", name: "Netsanet" },
  { id: "19", name: "Bethel" },
  { id: "21", name: "Henok" },
  { id: "23", name: "Ruth" },
] as const;

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const INITIAL_FORM_DATA: NewRequestInput = {
  title: "",
  note: "",
  owner: "",
  dueDate: "",
  status: "new",
  priority: "medium",
};

export default function NewRequest() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDueDatePickerOpen, setIsDueDatePickerOpen] = useState(false);
  const [formData, setFormData] = useState<NewRequestInput>(INITIAL_FORM_DATA);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

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

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();
    setLoading(true);

    const validation = NewRequestSchema.safeParse(formData);

    if (!validation.success) {
      const tree = z.treeifyError(validation.error);
      setFieldErrors({
        title: tree.properties?.title?.errors.at(0),
        note: tree.properties?.note?.errors.at(0),
        owner: tree.properties?.owner?.errors.at(0),
        dueDate: tree.properties?.dueDate?.errors.at(0),
        status: tree.properties?.status?.errors.at(0),
        priority: tree.properties?.priority?.errors.at(0),
      });
      setLoading(false);
      return;
    }

    const backendPayload = {
      ...validation.data,
      submittedAt: new Date().toISOString(),
    };

    console.log("New request payload ready", backendPayload);
    toast.success("Request is ready to be sent to backend.", {
      position: "top-right",
    });

    setFieldErrors({});
    setFormData(INITIAL_FORM_DATA);
    setIsDueDatePickerOpen(false);
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button
            type="button"
            className="cursor-pointer bg-blue-500 text-white">
            New request
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>New request</DialogTitle>
          </DialogHeader>
          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <Field className="sm:col-span-2">
              <Label htmlFor="request-title">Title</Label>
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
                {OWNER_OPTIONS.map((owner) => (
                  <NativeSelectOption key={owner.id} value={owner.id}>
                    {owner.name}
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
              <Label htmlFor="request-status">Status</Label>
              <NativeSelect
                id="request-status"
                name="status"
                className="w-full"
                value={formData.status}
                onChange={(event) =>
                  handleChange("status", event.target.value)
                }>
                {RequestStatusValues.map((status) => (
                  <NativeSelectOption key={status} value={status}>
                    {status}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              <FieldError errors={[{ message: fieldErrors.status }]} />
            </Field>

            <Field>
              <Label htmlFor="request-priority">Priority</Label>
              <NativeSelect
                id="request-priority"
                name="priority"
                className="w-full"
                value={formData.priority}
                onChange={(event) =>
                  handleChange("priority", event.target.value)
                }>
                {RequestPriorityValues.map((priority) => (
                  <NativeSelectOption key={priority} value={priority}>
                    {priority}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
              <FieldError errors={[{ message: fieldErrors.priority }]} />
            </Field>

            <Field className="sm:col-span-2">
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
            <Button type="submit" disabled={loading}>
              {loading ? "Validating..." : "Create request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
