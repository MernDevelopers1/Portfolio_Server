import { ApiResponse } from "../types/response";

export function sendResponse<T>(
  res: import("express").Response,
  {
    success = true,
    message = "",
    data,
    error,
    statusCode = 200,
  }: ApiResponse<T> & { statusCode?: number }
) {
  res.status(statusCode).json({
    success,
    message,
    data,
    error,
  });
}
