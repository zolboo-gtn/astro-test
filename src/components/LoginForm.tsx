import { navigate } from "astro:transitions/client";
import { useState } from "react";
import type { FormEvent } from "react";

import type { LoginApiError } from "@/pages/api/login";
import { Button } from "@/ui/button";

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
    <form onSubmit={handleSubmit} data-astro-reload>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          defaultValue="test@email.com"
        />
      </label>
      {apiErrors.email && <p>{apiErrors.email}</p>}
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          id="password"
          autoComplete="password"
          defaultValue="password"
        />
      </label>
      {apiErrors.password && <p>{apiErrors.password}</p>}
      <Button type="submit">{isPending ? "Logging in" : "Login"}</Button>
      {apiErrors.api && <p>{apiErrors.api}</p>}
    </form>
  );
};
