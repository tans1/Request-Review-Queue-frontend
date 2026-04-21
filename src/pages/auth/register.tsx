import { useState } from "react";
import { NewUser, type NewUserInput } from "@/features/auth/auth.schema";
import * as z from "zod";
import { registerUser } from "@/features/auth/api";
import { toast } from "sonner";
import RegistrationForm from "@/components/forms/register";
import { useNavigate } from "react-router-dom";

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

type FieldName = "name" | "email" | "password" | "confirmPassword";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<NewUserInput>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleChange = (field: FieldName, value: string) => {
    setFieldErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();
    setLoading(true);

    const validationResult = NewUser.safeParse(formData);

    if (!validationResult.success) {
      const zodFieldErrors = z.treeifyError(validationResult.error);
      setFieldErrors({
        name: zodFieldErrors.properties?.name?.errors?.at(0),
        email: zodFieldErrors.properties?.email?.errors?.at(0),
        password: zodFieldErrors.properties?.password?.errors?.at(0),
        confirmPassword:
          zodFieldErrors.properties?.confirmPassword?.errors?.at(0),
      });
    } else {
      try {
        const { error } = await registerUser(validationResult.data);
        if (error) {
          toast.error(error.message, { position: "top-right" });
        } else {
          navigate("/auth/confirmation");
        }
      } catch (er) {
        toast.error( er instanceof Error ? er.message : "Error occured", { position: "top-right" });
      }

      setFieldErrors({});
    }

    setLoading(false);
  };

  return (
    <RegistrationForm
      formData={formData}
      fieldErrors={fieldErrors}
      loading={loading}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
