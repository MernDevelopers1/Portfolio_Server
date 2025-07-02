import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/user.controller";
import errorHandler from "../middlewares/errorHandler";
import { validateUserMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

// Helper to wrap async route handlers
const asyncHandler =
  (fn: any) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

router.get("/", asyncHandler(getAllUsers), errorHandler);
router.get("/:id", asyncHandler(getUserById), errorHandler);
router.post(
  "/",
  validateUserMiddleware,
  asyncHandler(createUser),
  errorHandler
);
router.patch("/:id", asyncHandler(updateUser), errorHandler);
router.delete("/:id", asyncHandler(deleteUser), errorHandler);

export default router;
