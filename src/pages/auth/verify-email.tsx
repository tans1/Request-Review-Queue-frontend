import { useEffect, useState } from "react";
import { redirect, useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../features/auth/api";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const callbackURL = searchParams.get("callbackURL") || "/";

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const run = async () => {
      try {
        await verifyEmail(token);
        setStatus("success");

        setTimeout(() => {
          navigate(callbackURL, { replace: true });
        }, 1000);
        
      } catch (err) {
        toast.error(err, {position: "top-right"})
        setStatus("error");
      }
    };

    run();
  }, [token, callbackURL, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      {status === "loading" && <p>Verifying your email...</p>}
      {status === "success" && <p>Email verified. Redirecting...</p>}
      {status === "error" && (
        <p className="text-red-500">Invalid or expired verification link.</p>
      )}
    </div>
  );
}