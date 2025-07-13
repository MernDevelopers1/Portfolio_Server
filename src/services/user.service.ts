import User from "../models/user.model";
import { IUserSchema } from "../types/user";

export const getAllUsersService = async (): Promise<IUserSchema[]> => {
  return await User.find();
};
export const findUserByEmailService = async (
  email: string
): Promise<IUserSchema | null> => {
  return await User.findOne({ email });
};
export const getUserByIdService = async (
  id: string
): Promise<IUserSchema | null> => {
  return await User.findById(id);
};
export const createUserService = async (
  userData: IUserSchema
): Promise<IUserSchema> => {
  //   console.log("userData :>> ", userData);
  const user = new User(userData);
  return await user.save();
};
export const updateUserService = async (
  id: string,
  userData: Partial<IUserSchema>
): Promise<IUserSchema | null> => {
  return await User.findByIdAndUpdate(id, userData, { new: true });
};
export const deleteUserService = async (
  id: string
): Promise<IUserSchema | null> => {
  return await User.findByIdAndDelete(id);
};
export const getUserByEmailService = async (
  email: string
): Promise<IUserSchema | null> => {
  return await User.findOne({ email });
};
