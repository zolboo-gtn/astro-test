import { navigate } from "astro:transitions/client";
import { useState } from "react";
import type { FormEvent } from "react";

export const LogoutForm: React.FC = () => {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsPending(true);
      const response = await fetch("/api_logout", {
        method: "POST",
      });

      if (response.ok) {
        return navigate("/login");
      }
      // TODO: error handling
    } catch (error) {
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button>{isPending ? "Logging out" : "Logout"}</button>
    </form>
  );
};
