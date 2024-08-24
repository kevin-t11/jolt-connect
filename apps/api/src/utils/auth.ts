import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "@jolt-connect/db";
import { JWT_PASSWORD } from "../config";
import { SigninSchema, SignupSchema } from "@jolt-connect/shared";
import { authMiddleware } from "./middleware";

const router = Router();

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const signupData = SignupSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: signupData.email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(signupData.password, 10);

    // Create the user
    const user = await db.user.create({
      data: {
        name: signupData.name,
        email: signupData.email,
        password: hashedPassword,
      },
    });

    // Generate JWT
    const token = jwt.sign({ id: user.id }, JWT_PASSWORD);

    return res
      .status(201)
      .json({ id: user.id, email: user.email, jwtToken: token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Signin route
router.post("/login", async (req, res) => {
  try {
    const signinData = SigninSchema.parse(req.body);

    // Check if user exists
    const user = await db.user.findUnique({
      where: { email: signinData.email },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      signinData.password,
      user.password,
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id }, JWT_PASSWORD);

    return res
      .status(200)
      .json({ id: user.id, email: user.email, jwtToken: token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Protected route example
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const userId = (req as any).id;

    // Fetch user from database
    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ id: user.id, email: user.email });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

export const authRouter: Router = router;
