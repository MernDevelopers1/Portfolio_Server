import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes, authRoutes);
app.use(errorHandler);

export default app;
