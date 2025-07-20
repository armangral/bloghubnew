import { Router } from "express";
import authRoutes from "./authRoutes.js";
import postRoutes from "./postRoutes.js";

const router = Router();

// Health check endpoint
router.get("/", (req, res) => {
  res.status(200).json({ status: "API is running" });
});

// Mount feature-specific routers
router.use("/auth", authRoutes);
router.use("/posts", postRoutes);

export default router;
