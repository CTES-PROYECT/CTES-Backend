import { NextFunction, Request, Response, Router } from "express";
import { ResponseError } from "../constant/msgResponse";
import {
  getAllInfoProject,
  getCantidadPrject,
  getCantProyectForRegion,
  getCantProyectForState,
  getCantProyectForType,
  getCantTotalLongitud,
  getComunasForRegion,
  getMandantes,
  getProjectPreview,
  getRegionesComunas
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
router.get("/cantidad",middlewareToken,getCantidadPrject);
router.get("/longitud/cantidad",getCantTotalLongitud);
router.post("/", middlewareToken, getProjectPreview);
router.get("/info/:id", middlewareToken, getAllInfoProject);
router.get("/cantidad/estado",middlewareToken,getCantProyectForState);
router.get("/cantidad/region",middlewareToken,getCantProyectForRegion);
router.get("/add/projectJson",InsertProyect);
router.get("/cantidad/clasificacion",middlewareToken,getCantProyectForType);
router.get("/regiones",middlewareToken,getRegionesComunas);
router.get("/:idRegion/comunas",middlewareToken,getComunasForRegion);
router.get("/mandantes",middlewareToken,getMandantes);
//TODO: eliminar comentario para agregar proyectos desde json
//router.get("/insert/toJso",InsertProyect)
export default router;
