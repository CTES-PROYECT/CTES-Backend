import { NextFunction, Request, Response, Router } from "express";
import { body } from "express-validator";
import { ResponseError } from "../constant/msgResponse";
import {
  addNewProject,
  changeEnable,
  getAllInfoProject,
  getCantidadPrject,
  getCantProyectForRegion,
  getCantProyectForState,
  getCantProyectForType,
  getCantTotalLongitud,
  getComunasForRegion,
  getMandantes,
  getProjectPending,
  getProjectPendingActualizacion,
  getProjectPreview,
  getProyectPendingForId,
  getProyectRejectForId,
  getRegionesComunas,
  getUpdateAllInfoProject,
  putUpdateProject
} from "../controller/Proyectos";
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
router.get("/update/info/:id", middlewareToken, getUpdateAllInfoProject);
router.get("/cantidad/estado",middlewareToken,getCantProyectForState);
router.get("/cantidad/region",middlewareToken,getCantProyectForRegion);
router.post("/add",middlewareToken,addNewProject);
router.get("/cantidad/clasificacion",middlewareToken,getCantProyectForType);
router.get("/regiones",middlewareToken,getRegionesComunas);
router.get("/:idRegion/comunas",middlewareToken,getComunasForRegion);
router.get("/mandantes",middlewareToken,getMandantes);
router.get("/pending",middlewareToken,getProjectPending);
router.get("/pending/update",middlewareToken,getProjectPendingActualizacion);
router.put("/enable",[middlewareToken,
  body("enable").notEmpty(),
  body("idProject").notEmpty(),
],changeEnable);
router.get("/rejects",middlewareToken,getProyectRejectForId);
router.get("/pendingid",middlewareToken,getProyectPendingForId);
router.put("/update/:id",middlewareToken,putUpdateProject);

//TODO: eliminar comentario para agregar proyectos desde jsonz
//router.get("/insert/toJso",InsertProyect)
export default router;
