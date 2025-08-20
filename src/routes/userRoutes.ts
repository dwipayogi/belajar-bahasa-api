import { Router } from "express";
import {
  createUser,
  loginUser,
  getUser,
  getAllUsers,
} from "../controllers/userController.ts";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/login", loginUser);
router.post("/", createUser);

export default router;
