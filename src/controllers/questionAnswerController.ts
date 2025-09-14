import { Request, Response } from "express";
import { Language, Material, Title, Type } from "@prisma/client";
import prisma from "../client.ts";

export const createAnswer = async (req: Request, res: Response) => {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Payload must include non-empty 'answers' array",
      });
    }

    const newQuestionAnswers = await prisma.questionAnswer.createMany({
      data: answers.map((a) => ({
        userId: a.userId,
        session: a.session,
        language: a.language as Language,
        questionTitle: a.title as Title,
        questionType: a.type as Type,
        questionMat: a.material as Material,
        number: a.number,
        answer: a.answer,
      })),
      skipDuplicates: true,
    });

    res.status(201).json({
      success: true,
      message: "Question answers created successfully",
      count: newQuestionAnswers.count,
    });
  } catch (error) {
    console.error("Error creating question answers:", error);
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
