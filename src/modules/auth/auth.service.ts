import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "../../configs/prisma";
import { RegisterDTO, LoginDTO } from "./auth.schema";

const SECRET_KEY = process.env.JWT_SECRET || "rahasia";

export const register = async (data: RegisterDTO) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) throw new Error("Email already registered.");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

export const login = async (data: LoginDTO) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (!user) throw new Error("Invalid credentials.");

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) throw new Error("Invalid credentials.");

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    SECRET_KEY,
    { expiresIn: "1d" }
  );

  return token;
};
