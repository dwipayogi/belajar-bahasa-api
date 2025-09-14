import { Router } from "express";
import {
  createUser,
  loginUser,
  getUser,
  getAllUsers,
  updateUser,
  getUserAnswers,
  getUserbyLanguage
} from "../controllers/userController.ts";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.get("/:id/answers", getUserAnswers);
router.post("/login", loginUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.get("/language/:language", getUserbyLanguage);

export default router;
