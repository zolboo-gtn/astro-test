// FIXME:  https://github.com/withastro/astro/issues/8401

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies }) => {
  cookies.delete("session");

  await new Promise((resolve) => setTimeout(resolve, 2500));
  return new Response(null, { status: 200 });
};
