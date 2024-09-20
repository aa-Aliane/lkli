import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export interface IAccountForm {
  username: string;
  firstName: string;
  lastName: string;
  fileInput: FileList; // Assuming file input returns a FileList
}

export const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long."),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters long."),
  lastName: z.string().min(3, "Last name must be at least 3 characters long."),
  fileInput: z
    .instanceof(FileList)
    .refine(
      (fileList) =>
        fileList.length === 0 ||
        (fileList.length === 1 && fileList[0].size <= MAX_FILE_SIZE),
      {
        message: `Max image size is 5MB.`,
      }
    )
    .refine(
      (fileList) =>
        fileList.length === 0 ||
        (fileList.length === 1 &&
          ACCEPTED_IMAGE_TYPES.includes(fileList[0].type)),
      {
        message: "Only .jpg, .jpeg, .png, and .webp formats are supported.",
      }
    ),
});
