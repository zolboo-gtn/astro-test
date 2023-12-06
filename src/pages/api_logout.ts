// FIXME:  https://github.com/withastro/astro/issues/8401

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies }) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  cookies.delete("session");

  return new Response(null, { status: 200 });
};
