import express from "express";
import errorHandler from "../middlewares/errorHandler";
import {
  loginController,
  logoutController,
} from "../controllers/auth.controller";
import { asyncHandler } from "../utils/AsyncHandler";

const router = express.Router();

router.post("/login", asyncHandler(loginController), errorHandler);
router.get("/logout", asyncHandler(logoutController), errorHandler);

export default router;
