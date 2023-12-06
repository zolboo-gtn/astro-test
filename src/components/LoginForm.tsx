import { navigate } from "astro:transitions/client";
import { useState } from "react";
import type { FormEvent } from "react";

import type { LoginApiError } from "@/pages/api/login";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

type Props = {
  redirectTo: string | null;
};
export const LoginForm: React.FC<Props> = ({ redirectTo }) => {
  const [isPending, setIsPending] = useState(false);
  const [apiErrors, setApiErrors] = useState<LoginApiError>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsPending(true);
      const formData = new FormData(event.target as HTMLFormElement);
      const response = await fetch("/api_login", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        return navigate(redirectTo ?? "/");
      }
      const errors = await response.json();
      setApiErrors(errors);
    } catch (error) {
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-astro-reload
      className="flex flex-col gap-y-2.5"
    >
      <fieldset className="flex flex-col gap-y-2.5" disabled={isPending}>
        <Label htmlFor="email">
          Email:
          <Input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            defaultValue="test@email.com"
          />
        </Label>
        {apiErrors.email && <p>{apiErrors.email}</p>}
        <Label htmlFor="password">
          Password:
          <Input
            type="password"
            name="password"
            id="password"
            autoComplete="password"
            defaultValue="password"
          />
        </Label>
        {apiErrors.password && <p>{apiErrors.password}</p>}
        <Button type="submit">{isPending ? "Logging in" : "Login"}</Button>
        {apiErrors.api && <p>{apiErrors.api}</p>}
      </fieldset>
    </form>
  );
};
