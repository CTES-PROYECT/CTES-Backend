import { NextFunction, Request, Response, Router } from "express";
import {
  confimedUser,
  logInUser,
  registerUser,
  updateRolUser,
  updateStateUsers,
} from "../controller/Usuarios";
import { body } from "express-validator";
import { resultValidationToken } from "../models/interfaces";
import { verifyBearerToken } from "../controller/utils/validations";
import { ResponseError } from "../constant/msgResponse";

const router = Router();
const middlewareToken = (req: Request, res: Response, next: NextFunction) => {
  const tokenVerify: resultValidationToken = verifyBearerToken(
    req.headers.authorization
  );
  if (!tokenVerify.validation) {
    return res.status(401).json({
      status: "ERROR",
      msg: ResponseError.Unauthorized,
    });
  }

  req.body.idUser = tokenVerify.id;

  return next();
};

// /api/users

router.get("/", middlewareToken, confimedUser);

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  logInUser
);
router.post(
  "/register",
  [
    body("email").isEmail(),
    body("password").notEmpty(),
    body("fullName").isString(),
  ],
  registerUser
);
router.put(
  "/update/state",
  [
    body("token").isString(),
    body("idUserPut").notEmpty(),
    body("condition").isBoolean(),
  ],
  updateStateUsers
);
router.put(
  "/update/rol",
  [
    body("token").isString(),
    body("idUserPut").notEmpty(),
    body("rol").notEmpty(),
  ],
  updateRolUser
);

export default router;
