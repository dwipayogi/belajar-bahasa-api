import { Router } from "express";
import {
  createAnswer,
  getAnswerbyLanguage
} from "../controllers/questionAnswerController.ts";

const router = Router();

router.post("/", createAnswer);
router.get("/:language", getAnswerbyLanguage);

export default router;
