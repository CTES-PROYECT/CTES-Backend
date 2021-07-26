"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const msgResponse_1 = require("../constant/msgResponse");
const Proyectos_1 = require("../controller/Proyectos");
const validations_1 = require("../controller/utils/validations");
const router = express_1.Router();
const middlewareToken = (req, res, next) => {
    const tokenVerify = validations_1.verifyBearerToken(req.headers.authorization);
    if (!tokenVerify.validation) {
        return res.status(401).json({
            status: "ERROR",
            msg: msgResponse_1.ResponseError.Unauthorized,
        });
    }
    req.body.idUser = tokenVerify.id;
    return next();
};
// api/projects/
router.get("/cantidad", middlewareToken, Proyectos_1.getCantidadPrject);
router.get("/longitud/cantidad", Proyectos_1.getCantTotalLongitud);
router.post("/", middlewareToken, Proyectos_1.getProjectPreview);
router.get("/info/:id", middlewareToken, Proyectos_1.getAllInfoProject);
router.get("/cantidad/estado", middlewareToken, Proyectos_1.getCantProyectForState);
router.get("/cantidad/region", middlewareToken, Proyectos_1.getCantProyectForRegion);
router.post("/add", middlewareToken, Proyectos_1.addNewProject);
router.get("/cantidad/clasificacion", middlewareToken, Proyectos_1.getCantProyectForType);
router.get("/regiones", middlewareToken, Proyectos_1.getRegionesComunas);
router.get("/:idRegion/comunas", middlewareToken, Proyectos_1.getComunasForRegion);
router.get("/mandantes", middlewareToken, Proyectos_1.getMandantes);
router.get("/pending", middlewareToken, Proyectos_1.getProjectPending);
router.put("/enable", [middlewareToken,
    express_validator_1.body("enable").notEmpty(),
    express_validator_1.body("idProject").notEmpty(),
], Proyectos_1.changeEnable);
//TODO: eliminar comentario para agregar proyectos desde jsonz
//router.get("/insert/toJso",InsertProyect)
exports.default = router;
//# sourceMappingURL=ProyectosRouter.js.map