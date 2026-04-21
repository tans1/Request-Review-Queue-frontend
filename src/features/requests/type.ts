export type UserRole = "NORMAL_USER" | "ADMIN" | "OWNER";

export type RequestStatus =
  | "NEW"
  | "IN_REVIEW"
  | "NEEDS_INFO"
  | "APPROVED"
  | "REJECTED";

export type RequestPriority = "HIGH" | "MEDIUM" | "LOW";

export type ActivityType =
  | "CREATED"
  | "STATUS_CHANGED"
  | "OWNER_ASSIGNED"
  | "OWNER_REASSIGNED"
  | "NOTE_ADDED"
  | "REJECTED";

export type RequestUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

export type RequestActivity = {
  id: string;
  requestId: string;
  type: ActivityType;
  createdAt: string;
};

export type RequestNote = {
  id: string;
  requestId: string;
  authorId: string | null;
  author: RequestUser | null;
  content: string;
  createdAt: string;
};

export type RequestType = {
  id: string;
  title: string;

  submitterId: string;
  submitter: RequestUser;

  status: RequestStatus;
  priority: RequestPriority;

  ownerId: string | null;
  owner: RequestUser | null;

  dueDate: string;
  requiredFieldsComplete: boolean;
  rejectionReason: string | null;

  notes: RequestNote[];
  history: RequestActivity[];

  createdAt: string;
  updatedAt: string;
};