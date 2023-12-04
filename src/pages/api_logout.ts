// FIXME:  https://github.com/withastro/astro/issues/8401

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete("session");

  return redirect("/login");
};
