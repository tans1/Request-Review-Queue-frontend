import { useState } from "react";
import LoginForm from "../../components/forms/login";
import { loginUser } from "../../features/auth/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();
    setLoading(true);

    const loginPayload = {
      email: formData.email.trim(),
      password: formData.password,
    };

    if (loginPayload.email && loginPayload.password) {
      try {
        const { error } = await loginUser(loginPayload);
        if (error) {
          toast.error(error.message, { position: "top-right" });
        } else {
          navigate("/dashboard");
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Error occured" , { position: "top-right" });
      }
    }
    setLoading(false);
  };

  return (
    <LoginForm
      formData={formData}
      loading={loading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
