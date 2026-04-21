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
    console.log("the response is", resp)
    return { success: true, data: resp.data, err: null };
  } catch (err) {
    console.log("the error is", err)
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