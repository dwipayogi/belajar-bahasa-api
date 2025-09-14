import { Request, Response } from "express";
import { Language, Material, Title, Type } from "@prisma/client";
import prisma from "../client.ts";

export const createAnswer = async (req: Request, res: Response) => {
  try {
    const { userId, session, language, title, type, material, number, answer } = req.body;

    const newQuestionAnswer = await prisma.questionAnswer.create({
      data: {
        userId,
        session,
        language: language as Language,
        questionTitle: title as Title,
        questionType: type as Type,
        questionMat: material as Material,
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

export const getAnswerbyLanguage = async (req: Request, res: Response) => {
  const { id, language } = req.params;
  try {
    const answers = await prisma.questionAnswer.findMany({
      where: {
        userId: id,
        language: language as Language,
      },
      orderBy: [
        { questionType: "asc" },
        { questionTitle: "asc" },
        { number: "asc" },
      ],
    });
    res.status(200).json({
      success: true,
      data: answers,
    });
  } catch (error) {
    console.error("Error fetching answers by language:", error);
    res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
};
