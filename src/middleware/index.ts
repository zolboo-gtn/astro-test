import { sequence } from "astro:middleware";

import { auth } from "./auth";

export const config = {
  matcher: ["/((?!api|_next|assets|favicon.ico).*)"],
};
export const onRequest = sequence(auth);
