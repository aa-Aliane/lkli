import { z } from "zod";

export interface ISignupForm {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

export const schema = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});
