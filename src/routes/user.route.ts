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
import { asyncHandler } from "../utils/AsyncHandler";

const router = express.Router();

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
