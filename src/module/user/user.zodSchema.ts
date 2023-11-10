import { User } from "@prisma/client";
import { z } from "zod";

const zodUserSchema = z.object({
  id: z.string().optional(), // Define your validation rules for each field
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  location: z.string(),
  role: z.string(),
  contactNo: z.string(),
  address: z.string(),
  profileImg: z.string(),
});

// Define a separate validation function
export const validateUser = (data: User) => {
  return zodUserSchema.safeParse(data);
};
