import express from "express";
import { router as notesRouter } from "./notes/router.js";
import { router as authRouter } from "./auth/router.js";

export const router = express.Router();

router.use("/auth", authRouter);
router.use("/notes", notesRouter);
