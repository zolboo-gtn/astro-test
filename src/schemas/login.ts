import { email, maxLength, minLength, object, string } from "valibot";
import type { Output } from "valibot";

export const LoginSchema = object({
  email: string([email("The email address is badly formatted.")]),
  password: string([
    minLength(1, "Please enter your password."),
    maxLength(8, "Your password must have 8 characters or less."),
  ]),
});
export type LoginSchema = Output<typeof LoginSchema>;
