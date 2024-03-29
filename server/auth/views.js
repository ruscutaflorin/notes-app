import {
  loginService,
  registerService,
  changePasswordService,
} from "./services/user.js";
import { validationResult } from "express-validator";

export async function loginView(req, res) {
  try {
    const { email, password } = req.body;
    const user = await loginService(email, password);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(501).json(err.message);
  }
}

export async function registerView(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userData = req.body;
    const user = await registerService(userData);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(501).json(err.message);
  }
}

export const changePasswordController = async (req, res) => {
  const { username, currentPassword, newPassword } = req.query;
  try {
    const result = await changePasswordService(
      username,
      currentPassword,
      newPassword
    );
    console.log(result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
