import { PrismaClient } from "@prisma/client";

// Create a single instance of PrismaClient
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

// Function to connect to database
export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Successfully connected to MongoDB with Prisma");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1);
  }
};

// Function to disconnect from database
export const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error disconnecting from database:", error);
  }
};

export default prisma;
