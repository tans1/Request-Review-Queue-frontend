import { authClient } from "../../lib/auth-client";
import type { NewUserInput } from "./auth.schema";

export const registerUser = async (payload: NewUserInput) => {
  return await authClient.signUp.email({
    ...payload,
    callbackURL: "/dashboard",
  });
};

export const verifyEmail = async (token: string) => {
  return await authClient.verifyEmail({
    query: {
      token,
    },
  });
};

// type LoginFormData = {
//   email: string;
//   password: string;
// };
// export const loginUser = (payload: LoginFormData) => {};
