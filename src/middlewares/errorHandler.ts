import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/response";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Inter Server Error", err.stack);
  sendResponse(res, {
    error: err.message || "Internal Server Error",
    statusCode: 500,
    success: false,
    message: "An error occurred",
  });
};

export default errorHandler;
