import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";

import opportunityRoutes from "./routes/opportunity.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import seedRoutes from "./routes/seed.routes.js";
import startupRoutes from "./routes/startup.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://startupforge-client-gamma.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/opportunities", opportunityRoutes);
app.use("/applications", applicationRoutes);
app.use("/users", userRoutes);
app.use("/seed", seedRoutes);
app.use("/startups", startupRoutes);
app.use(cookieParser());

// Root Route
app.get("/", (req, res) => {
  res.send("StartupForge Server is Running...");
});

// Start Server
async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `🚀 StartupForge Server is running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();