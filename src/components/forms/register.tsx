import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import type { NewUserInput } from "@/features/auth/auth.schema";

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};
type FieldName = "name" | "email" | "password" | "confirmPassword";

type RegistrationFormProps = {
  formData: NewUserInput;
  fieldErrors: FieldErrors;
  loading: boolean;
  handleChange: (field: FieldName, value: string) => void;
  handleSubmit: (event: React.SubmitEvent) => void;
};

export default function RegistrationForm({
  formData,
  fieldErrors,
  loading,
  handleChange,
  handleSubmit,
}: RegistrationFormProps) {
  return (
    <Card className="w-full max-w-80 shadow">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(event) => handleChange("name", event.target.value)}
                aria-invalid={Boolean(fieldErrors.name)}
                required
              />
              {fieldErrors.name && (
                <p className="text-[11px] text-destructive text-left">
                  {fieldErrors.name}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={(event) => handleChange("email", event.target.value)}
                aria-invalid={Boolean(fieldErrors.email)}
                required
              />
              {fieldErrors.email && (
                <p className="text-[11px] text-destructive text-left">
                  {fieldErrors.email}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={(event) =>
                  handleChange("password", event.target.value)
                }
                aria-invalid={Boolean(fieldErrors.password)}
                required
              />
              {fieldErrors.password && (
                <p className="text-[11px] text-destructive text-left">
                  {fieldErrors.password}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(event) =>
                  handleChange("confirmPassword", event.target.value)
                }
                aria-invalid={Boolean(fieldErrors.confirmPassword)}
                required
              />
              {fieldErrors.confirmPassword && (
                <p className="text-[11px] text-destructive text-left">
                  {fieldErrors.confirmPassword}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Create account"}
            </Button>
            {/* <Button type="button" variant="outline" className="w-full">
              Continue with Google
            </Button> */}
          </div>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link to="/auth/login" className="underline underline-offset-4">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
