import { Request, Response, NextFunction } from "express";
import { loginService } from "../services/auth.service";
import { generateToken } from "../utils/generateToken";
import { IUserSchema } from "../types/user";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user: IUserSchema | null = await loginService(email, password);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (!user._id) {
      return res.status(500).json({ message: "User ID is missing" });
    }
    const Token = await generateToken(user._id);

    // Set token as HTTP-only cookie
    res.cookie("token", Token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // use secure cookies in production
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
    });

    res.status(200).json({
      message: "Login successful",
      user: user,
      token: Token,
    });
  } catch (error) {
    next(error);
  }
};
export const logoutController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};
