import { Router } from "express";
import {
  createAnswer,
} from "../controllers/questionAnswerController.ts";

const router = Router();

router.post("/", createAnswer);

export default router;
