import { Request, Response } from "express";
import prisma from "../client.ts";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username) {
      return res.status(400).json({
        error: "Username is required",
      });
    }

    // Hash password if provided (optional for students)
    let hashedPassword = null;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // Create new user
    const userData: any = {
      username,
    };

    if (hashedPassword) {
      userData.password = hashedPassword;
    }

    const newUser = await prisma.user.create({
      data: userData,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: newUser.id,
        username: newUser.username,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        username: user.username,
        totalTrue: user.totalTrue,
        totalFalse: user.totalFalse,
        createdAt: user.createdAt,
        lastActivity: user.lastActivity,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password are required",
      });
    }

    // Find user by username
    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(
      password,
      user.password as string
    );
    if (!isValidPassword) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user.id,
        username: user.username,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Login user error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
