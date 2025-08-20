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

export const getAllAnswers = async (req: Request, res: Response) => {
  try {
    const questionAnswers = await prisma.questionAnswer.findMany();
    if (!questionAnswers || questionAnswers.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No question answers found",
      });
    } else {
      return res.status(200).json({
        success: true,
        data: questionAnswers,
      });
    }
  } catch (error) {
    console.error("Error fetching all question answers:", error);
    res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
};

export const getAnswerByLanguage = async (req: Request, res: Response) => {
  try {
    const { language } = req.params;

    const questionAnswers = await prisma.questionAnswer.findMany({
      where: { language: language as Language },
    });

    if (!questionAnswers || questionAnswers.length === 0) {
      return res.status(404).json({
        success: false,
        error: `No question answers found for language: ${language}`,
      });
    } else {
      res.status(200).json({
        success: true,
        data: questionAnswers,
      });
    }
  } catch (error) {
    console.error("Error fetching question answers by language:", error);
    res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
};

export const getAnswerByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const questionAnswers = await prisma.questionAnswer.findMany({
      where: { userId: userId },
    });

    if (!questionAnswers || questionAnswers.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No question answers found for this user",
      });
    }

    res.status(200).json({
      success: true,
      data: questionAnswers,
    });
  } catch (error) {
    console.error("Error fetching question answers by user ID:", error);
    res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
};

export const getAnswerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const questionAnswer = await prisma.questionAnswer.findUnique({
      where: { id: id },
    });

    if (!questionAnswer) {
      return res.status(404).json({
        success: false,
        error: "Question answer not found",
      });
    }

    res.status(200).json({
      success: true,
      data: questionAnswer,
    });
  } catch (error) {
    console.error("Error fetching question answer by ID:", error);
    res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
};

export const getAnswerBySession = async (req: Request, res: Response) => {
  try {
    const { session } = req.params;

    const questionAnswers = await prisma.questionAnswer.findMany({
      where: { session: parseInt(session) },
    });

    if (!questionAnswers || questionAnswers.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No question answers found for this session",
      });
    }

    res.status(200).json({
      success: true,
      data: questionAnswers,
    });
  } catch (error) {
    console.error("Error fetching question answers by session:", error);
    res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
};
