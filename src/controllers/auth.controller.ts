import { Request, Response, NextFunction } from "express";
import { loginService } from "../services/auth.service";
import { generateToken, verifyToken } from "../utils/generateToken";
import { IUserSchema } from "../types/user";
import {
  createUserService,
  findUserByEmailService,
  getUserByIdService,
} from "../services/user.service";
import { GoogleProfile } from "../types/auth";

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
export const verifyTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token :>> ", token);
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const userId = await verifyToken(token);
    if (!userId) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const user = await getUserByIdService(userId.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Token is valid", user });
  } catch (error) {
    next(error);
  }
};
export const googleLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const profile = req.user as GoogleProfile;
    const user = {
      name: profile.displayName,
      email: profile.emails && profile.emails[0]?.value,
      LoginMethod: "google",
    } as IUserSchema;
    if (!profile || !user.email) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    let userData: IUserSchema | null = await findUserByEmailService(user.email);
    if (!userData) {
      userData = await createUserService(user);
    }
    const Token = generateToken(userData?._id);
    // Set token as HTTP-only cookie
    res.cookie("token", Token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // use secure cookies in production
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
    });
    res.redirect(`${process.env.FRONTEND_URL}/oauth-callback?token=${Token}`);
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
