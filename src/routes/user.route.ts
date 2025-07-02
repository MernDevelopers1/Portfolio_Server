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

router.get("/users/", asyncHandler(getAllUsers), errorHandler);
router.get("/users/:id", asyncHandler(getUserById), errorHandler);
router.post(
  "/users/",
  validateUserMiddleware,
  asyncHandler(createUser),
  errorHandler
);
router.patch("/users/:id", asyncHandler(updateUser), errorHandler);
router.delete("/users/:id", asyncHandler(deleteUser), errorHandler);

export default router;
