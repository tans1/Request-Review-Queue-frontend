import type { RequestFilters } from "../../components/filters";
import { axiosClient } from "../../lib/_api";
import type { RequestType } from "./type";

export async function getOwners() {
  try {
    const resp = await axiosClient.get("/api/owners");
    return { success: true, data: resp.data, err: null };
  } catch (err) {
    return { success: false, data: null, err: err };
  }
}

type Payload = {
  id?: string;
  title: string;
  status: string;
  dueDate?: string;
  priority?: string;
  ownerId?: string;
  note?: string;
};

export async function createRequest(payload: Payload) {
  try {
    const resp = await axiosClient.post("/api/requests", {
      ...payload,
    });
    console.log("the response is", resp);
    return { success: true, data: resp.data, err: null };
  } catch (err) {
    console.log("the error is", err);
    return { success: false, data: null, err: err };
  }
}

export async function editRequest(payload: Payload) {
  try {
    const resp = await axiosClient.patch(`/api/requests/${payload.id}`, {
      ...payload,
    });
    console.log("the response is", resp);
    return { success: true, data: resp.data, err: null };
  } catch (err) {
    console.log("the error is", err);
    return { success: false, data: null, err: err };
  }
}


export async function getRequests(
  filters: RequestFilters,
): Promise<{ success: boolean; data: RequestType[]; err: unknown }> {
  try {
    const resp = await axiosClient.get("/api/requests", {
      params: {
        ...(filters.status && { status: filters.status }),
        ...(filters.priority && { priority: filters.priority }),
        ...(filters.dueDate && { dueDate: filters.dueDate }),
        ...(filters.owner && { ownerId: filters.owner }),
        ...(filters.search && { search: filters.search }),
        ...(filters.next_due && {nextDue: filters.next_due})
      },
    });
    return { success: true, data: resp.data, err: null };
  } catch (err) {
    return { success: false, data: [], err: err };
  }
}

export async function getRequestById(id: string) {
  try {
    const resp = await axiosClient.get(`/api/requests/${id}`);
    return { success: true, data: resp.data, err: null };
  } catch (err) {
    return { success: false, data: null, err: err };
  }
}

type OwnerPayload = {
  requestId: string;
  ownerId: string;
};
export async function assignOwner(payload: OwnerPayload) {
  try {
    const resp = await axiosClient.patch(
      `/api/requests/${payload.requestId}/owner`,
      {
        ownerId: payload.ownerId,
      },
    );
    return { success: true, data: resp.data, err: null };
  } catch (err) {
    return { success: false, data: null, err: err };
  }
}

type StatusPayload = {
  requestId: string;
  newStatus: string;
};
export async function changeStatus(payload: StatusPayload) {
  try {
    const resp = await axiosClient.patch(
      `/api/requests/${payload.requestId}/status`,
      {
        newStatus: payload.newStatus,
      },
    );
    return { success: true, data: resp.data, err: null };
  } catch (err) {
    return { success: false, data: null, err: err };
  }
}

type NotePayload = {
  requestId: string;
  note: string;
};
export async function addNote(payload: NotePayload) {
  try {
    const resp = await axiosClient.post(
      `/api/requests/${payload.requestId}/notes`,
      {
        note: payload.note,
      },
    );
    return { success: true, data: resp.data, err: null };
  } catch (err) {
    return { success: false, data: null, err: err };
  }
}
