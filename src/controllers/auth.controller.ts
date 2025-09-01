import { Request, Response } from "express";
import prisma from "../connection/db";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

export const Signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  try {
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return res.status(409).send("User already exists");
    }

    user = await prisma.user.create({
      data: { email, password: hashSync(password, 10), name },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Internal Server Error");
  }
};
export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const isValidPassword = compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send("Invalid email or password");
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Remove password from response for security
    const { password: _, ...userWithoutPassword } = user;

    res.status(200).json({ 
      message: "Login successful", 
      user: userWithoutPassword, 
      token 
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
};
