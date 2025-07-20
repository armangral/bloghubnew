import express from "express";
import cors from "cors";
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";

// 🆕 Swagger Imports
import { swaggerUi, swaggerSpec } from "./config/swagger.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🆕 Swagger Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use("/api/v1", apiRouter);

// Error Handler
app.use(errorHandler);

export default app;
