import { Request, Response } from "express";
import { Language, Title, Type } from "@prisma/client";
import prisma from "../client.ts";

export const createAnswer = async (req: Request, res: Response) => {
  try {
    const { userId, session, language, title, type, number, answer } = req.body;

    const newQuestionAnswer = await prisma.questionAnswer.create({
      data: {
        userId,
        session,
        language: language as Language,
        questionTitle: title as Title,
        questionType: type as Type,
        number,
        answer,
      },
    });

    res.status(201).json({
      success: true,
      message: "Question answer created successfully",
      data: newQuestionAnswer,
    });
  } catch (error) {
    console.error("Error creating question answer:", error);
    res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
};