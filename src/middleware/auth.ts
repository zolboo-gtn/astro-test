import type { APIContext } from "astro";
import { defineMiddleware } from "astro:middleware";

const AUTH_ROUTES: (string | RegExp)[] = ["/login", "/api/login", "/api_login"];
const authRoutesGuard = (context: APIContext) => {
  const { pathname } = context.url;
  const isAuthRoute = AUTH_ROUTES.some((route) => {
    if (typeof route === "string") {
      return route === pathname;
    }
    return route.test(pathname);
  });
  const session = context.cookies.get("session");

  if (isAuthRoute && session) {
    return context.redirect("/");
  }
};

const PUBLIC_ROUTES: (string | RegExp)[] = [/^\/products.*$/];
const protectedRoutesGuard = (context: APIContext) => {
  const { pathname } = context.url;
  const isProtectedRoute = ![...AUTH_ROUTES, ...PUBLIC_ROUTES].some((route) => {
    if (typeof route === "string") {
      return route === pathname;
    }
    return route.test(pathname);
  });
  const session = context.cookies.get("session");

  if (isProtectedRoute && !session) {
    const url = new URL("/login", context.url);
    if (pathname !== "/") {
      url.searchParams.set("redirectTo", pathname);
    }

    return Response.redirect(url, 307);
  }
};
export const auth = defineMiddleware(async (context, next) => {
  const guards = [authRoutesGuard, protectedRoutesGuard];

  for (const guard of guards) {
    const response = guard(context);
    if (typeof response !== "undefined") {
      return response;
    }
  }

  return next();
});
