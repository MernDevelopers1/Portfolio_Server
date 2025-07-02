import User from "../models/user.model";
import { IUserSchema } from "../types/user";
import { comparePassword } from "../utils/HashPassword";

export const loginService = async (
  email: string,
  password: string
): Promise<IUserSchema | null> => {
  const user: IUserSchema | null = await User.findOne({ email });
  if (!user) {
    return null;
  }
  const isPasswordValid = await comparePassword(password, user?.password ?? "");
  if (!isPasswordValid) {
    return null;
  }
  return user;
};
