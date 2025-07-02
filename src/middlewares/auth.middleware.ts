import { validateUser } from "../validators/user.validator";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../types/user";

export const validateUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user: IUser = req.body;

  try {
    const { success, error } = validateUser(user);
    if (!success) {
      res.status(400).json({
        error: JSON.parse(error)?.[0]?.message || "Invalid user data",
      });
      return; // ✅ Fix: ensure function returns here
    }

    next(); // ✅ Now TypeScript is happy (function returns void)
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
    return; // ✅ Explicitly return after sending response
  }
};
