import express from "express";
import { validateLogin, validateRegister } from "../utils/validation.js";
import { loginView, registerView, changePasswordController } from "./views.js";
export const router = express.Router();

router.post("/login", validateLogin, loginView);
router.post("/register", validateRegister, registerView);
router.post("/change-password", changePasswordController);
