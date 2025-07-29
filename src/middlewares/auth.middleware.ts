import { validateUser } from "../validators/user.validator";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../types/user";
import { sendResponse } from "../utils/response";

export const validateUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user: IUser = req.body;

  try {
    const { success, error } = validateUser(user);
    if (!success) {
      sendResponse(res, {
        error: JSON.parse(error)?.[0]?.message || "Invalid user data",
        statusCode: 400,
        success: false,
        message: "Validation failed",
      });
      return; // ✅ Fix: ensure function returns here
    }

    next(); // ✅ Now TypeScript is happy (function returns void)
  } catch (error) {
    if (error instanceof Error) {
      sendResponse(res, {
        error: error.message,
        statusCode: 400,
        success: false,
        message: "An error occurred during validation",
      });
    } else {
      sendResponse(res, {
        error: "An unknown error occurred",
        statusCode: 400,
        success: false,
        message: "An unknown error occurred",
      });
    }
    return; // ✅ Explicitly return after sending response
  }
};
