import { Request, Response, NextFunction } from "express";
import { loginService } from "../services/auth.service";
import { generateToken, verifyToken } from "../utils/generateToken";
import { IUserSchema } from "../types/user";
import {
  createUserService,
  findUserByEmailService,
  findUserByUsernameService,
  getUserByIdService,
} from "../services/user.service";
import { GithubProfile, GoogleProfile } from "../types/auth";
import { sendResponse } from "../utils/response";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user: IUserSchema | null = await loginService(email, password);

    if (!user) {
      return sendResponse(res, {
        error: "Invalid email or password",
        statusCode: 401,
        success: false,
        message: "Login failed",
      });
    }
    const Token = await generateToken(user._id);

    // Set token as HTTP-only cookie
    res.cookie("token", Token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // use secure cookies in production
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
    });

    sendResponse(res, {
      message: "Login successful",
      statusCode: 200,
      success: true,
      data: {
        user: user,
        token: Token,
      },
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
    if (!token) {
      return sendResponse(res, {
        error: "No token provided",
        statusCode: 401,
        success: false,
        message: "Unauthorized",
      });
    }
    const userId = await verifyToken(token);
    if (!userId) {
      return sendResponse(res, {
        error: "Invalid token",
        statusCode: 401,
        success: false,
        message: "Unauthorized",
      });
    }
    const user = await getUserByIdService(userId.id);
    if (!user) {
      return sendResponse(res, {
        error: "User not found",
        statusCode: 404,
        success: false,
        message: "User not found",
      });
    }
    sendResponse(res, {
      message: "Token is valid",
      data: { user },
      statusCode: 200,
      success: true,
    });
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
      return sendResponse(res, {
        error: "Authentication failed",
        statusCode: 401,
        success: false,
        message: "Authentication failed",
      });
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
export const facebookLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("req.user :>> ", req.user);
    // const profile = req.user as GoogleProfile;
    // const user = {
    //   name: profile.displayName,
    //   email: profile.emails && profile.emails[0]?.value,
    //   LoginMethod: "google",
    // } as IUserSchema;
    // if (!profile || !user.email) {
    //   return sendResponse(res, {
    //     error: "Authentication failed",
    //     statusCode: 401,
    //     success: false,
    //     message: "Authentication failed",
    //   });
    // }
    // let userData: IUserSchema | null = await findUserByEmailService(user.email);
    // if (!userData) {
    //   userData = await createUserService(user);
    // }
    // const Token = generateToken(userData?._id);
    // // Set token as HTTP-only cookie
    // res.cookie("token", Token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // use secure cookies in production
    //   sameSite: "strict",
    //   maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
    // });
    // res.redirect(`${process.env.FRONTEND_URL}/oauth-callback?token=${Token}`);
  } catch (error) {
    next(error);
  }
};
export const githubLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("req.user :>> ", req.user);
    const profile = req.user as GithubProfile;
    // const profile = req.user as GoogleProfile;
    const user = {
      name: profile.displayName,
      username: profile.username,
      LoginMethod: "github",
    } as IUserSchema;
    if (!profile || !user.username) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    let userData: IUserSchema | null = await findUserByUsernameService(
      user.username
    );
    if (!userData) {
      userData = await createUserService(user);
    }
    const Token = generateToken(userData?._id);
    // // Set token as HTTP-only cookie
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
