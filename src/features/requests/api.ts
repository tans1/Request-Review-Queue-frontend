import { axiosClient } from "../../lib/_api";

export async function getOwners() {
  try {
    const resp = await axiosClient.get("/api/owners");
    return { success: true, data: resp.data, err: null };
  } catch (err) {
    return { success: false, data: null, err: err };
  }
}

type Payload = {
  title: string;
  dueDate: string;
  status?: string;
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

export async function getRequests() {
  try {
    const resp = await axiosClient.get("/api/requests");
    return { success: true, data: resp.data, err: null };
  } catch (err) {
    return { success: false, data: null, err: err };
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
