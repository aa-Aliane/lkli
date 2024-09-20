import { z } from "zod";

export interface ISigninForm {
  username: string;
  password: string;
}

export const schema = z.object({
  username: z.string().min(3),
  password: z.string(),
});
