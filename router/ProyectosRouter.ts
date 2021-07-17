import { NextFunction, Request, Response, Router } from "express";
import { ResponseError } from "../constant/msgResponse";
import {
  getAllInfoProject,
  getCantidadPrject,
  getCantProyectForRegion,
  getCantProyectForState,
  getProjectPreview
} from "../controller/Proyectos";
import { InsertProyect } from "../controller/utils/fuctions/CreateProyectos";
import { verifyBearerToken } from "../controller/utils/validations";
import { resultValidationToken } from "../models/interfaces";

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

// api/projects/
router.get("/cantidad",middlewareToken,getCantidadPrject)
router.get("/", middlewareToken, getProjectPreview);
router.get("/:id", middlewareToken, getAllInfoProject);
router.get("/", InsertProyect);
router.get("/cantidad/estado",middlewareToken,getCantProyectForState);
router.get("/cantidad/region",middlewareToken,getCantProyectForRegion);

export default router;
