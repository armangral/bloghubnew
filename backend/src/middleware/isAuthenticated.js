import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { AuthenticationError } from "../utils/errors.js";

const prisma = new PrismaClient();

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for the token in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from 'Bearer <token>'
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by the ID from the token's payload
      // Select only non-sensitive fields
      req.user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: { id: true, name: true, email: true },
      });

      if (!req.user) {
        throw new AuthenticationError(
          "User belonging to this token no longer exists."
        );
      }

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // The errorHandler will catch JWT errors or our custom AuthenticationError
      throw new AuthenticationError("Not authorized, token failed.");
    }
  }

  if (!token) {
    throw new AuthenticationError("Not authorized, no token provided.");
  }
});
