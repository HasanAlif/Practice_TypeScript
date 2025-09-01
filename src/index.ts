import express from "express";
import type { Express } from "express";
import { connectDB, disconnectDB } from "./connection/db";
import { PORT } from "./secrets";
import rootRouter from "./routes/index.route";

const app: Express = express();

app.use(express.json());

app.use("/api", rootRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down gracefully...");
  await disconnectDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n🛑 Shutting down gracefully...");
  await disconnectDB();
  process.exit(0);
});

startServer();
