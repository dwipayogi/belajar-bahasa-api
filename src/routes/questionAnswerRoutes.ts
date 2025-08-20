import { Router } from "express";
import {
  createAnswer,
  getAllAnswers,
  getAnswerByLanguage,
  getAnswerById,
  getAnswerBySession,
  getAnswerByUserId,
} from "../controllers/questionAnswerController.ts";

const router = Router();

router.post("/", createAnswer);
router.get("/", getAllAnswers);
router.get("/language/:language", getAnswerByLanguage);
router.get("/user/:userId", getAnswerByUserId);
router.get("/:id", getAnswerById);
router.get("/session/:session", getAnswerBySession);

export default router;
