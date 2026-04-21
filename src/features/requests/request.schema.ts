import * as z from "zod";

export const RequestStatusValues = [
  "new",
  "in review",
  "needs info",
  "approved",
  "rejected",
] as const;

export const RequestPriorityValues = ["low", "medium", "high"] as const;

export const NewRequestSchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters"),
  note: z.string().optional(),
  owner: z.string().trim().optional(),
  dueDate: z.iso.date("Please select a valid due date"),
  status: z.enum(RequestStatusValues).optional(),
  priority: z.enum(RequestPriorityValues).optional(),
});

export type NewRequestInput = z.infer<typeof NewRequestSchema>;
