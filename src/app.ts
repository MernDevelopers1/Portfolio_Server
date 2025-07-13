import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import errorHandler from "./middlewares/errorHandler";
import "./middlewares/passport"; // Import passport strategies
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);

export default app;
