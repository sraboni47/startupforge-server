import { createRequire } from "module";
const require = createRequire(import.meta.url);



const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { connectDB } = require("./config/db");

const opportunityRoutes = require("./routes/opportunity.routes");
const applicationRoutes = require("./routes/application.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const seedRoutes = require("./routes/seed.routes");
const startupRoutes = require("./routes/startup.routes");

dotenv.config();



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/opportunities", opportunityRoutes);
app.use("/applications", applicationRoutes);
app.use("/users", userRoutes);
app.use("/seed", seedRoutes);
app.use("/startups", startupRoutes);

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
        `🚀 StartupForge Server is running on http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();