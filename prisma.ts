import { PrismaClient } from "@prisma/client";

// Create a single instance of PrismaClient connects db
const prisma = new PrismaClient();

export default prisma;