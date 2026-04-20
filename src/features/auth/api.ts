import { authClient } from "../../lib/auth-client";
import type { NewUserInput } from "./auth.schema";

export const registerUser = async (payload: NewUserInput) => {
  const { data, error } = await authClient.signUp.email({
    ...payload,
    callbackURL: "http://localhost:5173/dashboard",
  });

  console.log(data);
  console.log(error);
};

export const verifyEmail = async (token: string) => {
  const resp = await authClient.verifyEmail({
    query: {
      token,
    },
  });

  console.log(resp)
};

// type LoginFormData = {
//   email: string;
//   password: string;
// };
// export const loginUser = (payload: LoginFormData) => {};
