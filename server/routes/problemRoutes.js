import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getProblems,
  getProblem,
  createProblem,
  updateProblem,
  deleteProblem,
} from "../controllers/problemController.js";

const router = express.Router();

router.use(protect);

router.get("/", getProblems);
router.post("/", createProblem);
router.get("/:id", getProblem);
router.put("/:id", updateProblem);
router.delete("/:id", deleteProblem);

export default router;
