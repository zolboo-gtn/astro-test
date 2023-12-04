import type { APIRoute } from "astro";
import { safeParse } from "valibot";

import { LoginSchema } from "@/schemas/login";

export type LoginApiError = {
  api?: string;
  email?: string;
  password?: string;
};
export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const validation = safeParse(LoginSchema, Object.fromEntries(data));
    if (!validation.success) {
      const errors: LoginApiError = {};
      for (const issue of validation.issues) {
        const paths = issue.path?.map(({ key }) => key);
        if (paths?.includes("email")) {
          errors.email = issue.message;
        }
        if (paths?.includes("password")) {
          errors.password = issue.message;
        }
      }

      return new Response(JSON.stringify(errors), { status: 400 });
    }

    return new Response(
      JSON.stringify({
        message: "Success!",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        api: "Unknown error",
      }),
      {
        status: 400,
      }
    );
  }
};
