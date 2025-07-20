// src/services/authService.js: Core business logic for authentication.

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "../utils/errors.js";

const prisma = new PrismaClient();

export const register = async (userData) => {
  const { name, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const login = async (credentials) => {
  const { email, password } = credentials;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    // Use AuthenticationError instead of generic Error
    throw new AuthenticationError("Invalid email or password");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};
