import express from "express";
import errorHandler from "../middlewares/errorHandler";
import {
  facebookLoginController,
  githubLoginController,
  googleLoginController,
  loginController,
  logoutController,
  verifyTokenController,
} from "../controllers/auth.controller";
import { asyncHandler } from "../utils/AsyncHandler";
import passport from "passport";
const router = express.Router();
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  asyncHandler(googleLoginController)
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  asyncHandler(facebookLoginController)
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  asyncHandler(githubLoginController)
);
router.get("/verifyToken", asyncHandler(verifyTokenController), errorHandler);
router.post("/login", asyncHandler(loginController), errorHandler);
router.get("/logout", asyncHandler(logoutController), errorHandler);

export default router;
