import express from "express";
import { validateUser } from "../utils/validation.js";
import { loginView, registerView } from "./views.js";
export const router = express.Router();

router.post("/login", loginView);
router.post("/register", validateUser, registerView);
