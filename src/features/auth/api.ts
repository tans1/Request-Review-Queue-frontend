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

// export const fetchUser = async () => {
//   return await authClient.useSession()
// }
type LoginFormData = {
  email: string;
  password: string;
};
export const loginUser = async (payload: LoginFormData) => {
  return await authClient.signIn.email({
    ...payload,
  });
};
