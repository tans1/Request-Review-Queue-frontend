import * as z from "zod";

export const RequestStatusValues = [
  "NEW",
  "IN_REVIEW",
  "NEEDS_INFO",
  "APPROVED",
  "REJECTED",
];

export const RequestPriorityValues = ["LOW", "MEDIUM", "HIGH"] as const;

export const NewRequestSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters"),
  note: z.string().optional(),
  owner: z.string().trim().optional(),
  dueDate: z.iso.date("Please select a valid due date"),
  status: z.enum(RequestStatusValues).optional(),
  priority: z.enum(RequestPriorityValues).optional(),
});
