import { IUser } from "../types/user";
import zod from "zod";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{8,}$/;

const userSchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  email: zod.string().email("Invalid email address"),
  password: zod
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      passwordRegex,
      "Password must have at least one uppercase letter, one digit, and one special symbol"
    ),
  role: zod.string().optional(),
});

export const validateUser = (
  user: IUser
): { success: boolean; error: string } => {
  const result = userSchema.safeParse(user);
  return {
    success: result.success,
    error: result.error?.message || "",
  };
};
export const validateUserUpdate = (user: Partial<IUser>): boolean => {
  if (user.email && user.email.indexOf("@") === -1) {
    throw new Error("Email must be a valid email address.");
  }
  if (user.password && user.password.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }
  return true;
};
export const validateUserId = (id: string): boolean => {
  if (!id) {
    throw new Error("User ID is required.");
  }
  if (typeof id !== "string") {
    throw new Error("User ID must be a string.");
  }
  return true;
};
