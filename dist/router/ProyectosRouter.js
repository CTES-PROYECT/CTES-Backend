"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const msgResponse_1 = require("../constant/msgResponse");
const Proyectos_1 = require("../controller/Proyectos");
const CreateProyectos_1 = require("../controller/utils/fuctions/CreateProyectos");
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
router.get("/add/projectJson", CreateProyectos_1.InsertProyect);
router.get("/cantidad/clasificacion", middlewareToken, Proyectos_1.getCantProyectForType);
router.get("/regiones", middlewareToken, Proyectos_1.getRegionesComunas);
router.get("/:idRegion/comunas", middlewareToken, Proyectos_1.getComunasForRegion);
router.get("/mandantes", middlewareToken, Proyectos_1.getMandantes);
//TODO: eliminar comentario para agregar proyectos desde json
//router.get("/insert/toJso",InsertProyect)
exports.default = router;
//# sourceMappingURL=ProyectosRouter.js.map