// server/routes/authRoutes.js
import express from 'express'; // If you are using ESM, you'll need to import express as well
import { body } from "express-validator";
import * as authController from '../controllers/authController.js'; // Assuming authController is also ESM

const router = express.Router();

router.post(
  "/signup",
  [
    body("username").trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }).escape()
  ],
  authController.signup
);

router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").exists().escape()
  ],
  authController.login
);

export default router; // Change this line
