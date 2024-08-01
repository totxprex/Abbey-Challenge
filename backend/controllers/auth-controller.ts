import express, { Router } from "express";
import { signupAUser } from "../model/auth/signup-user";
import { validateDTOAgainstBody } from "../global-middlewares/validate-dto";
import { LoginBodyDto, SignupBodyDto } from "../model/auth/auth.dto";
import { loginAUser } from "../model/auth/login-user";
import { verifyToken } from "../security/verify-token";
import { getAwsSignedUrl } from "../utils/file/get-from-aws";
import { verifyPassKey } from "../security/verify-pass-key";

const controller_slug = "auth";

export const AuthController: Router = express.Router();

AuthController.post(
  `/${controller_slug}/signup`,
  verifyPassKey(),
  validateDTOAgainstBody(SignupBodyDto),
  signupAUser(),
);

AuthController.post(
  `/${controller_slug}/login`,
  verifyPassKey(),
  validateDTOAgainstBody(LoginBodyDto),
  loginAUser(),
);

AuthController.get(
  `/file/aws/:folder/:filename`,
  verifyToken(),
  getAwsSignedUrl(),
);


