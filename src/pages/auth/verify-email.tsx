import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../features/auth/api";

export default function VerifyEmailPage() {
  //   const { token } = useSearchParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  console.log(searchParams.get("callbackURL"))

  useEffect(() => {
    const verify = async (token: string | null) => {
      if (!token) {
        throw new Error("the token is not found");
      }
      await verifyEmail(token);
    };
    verify(token);
  }, [token]);

  return <div>Email is being verified</div>;
}
