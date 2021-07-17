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
router.get("/", middlewareToken, Proyectos_1.getProjectPreview);
router.get("/:id", middlewareToken, Proyectos_1.getAllInfoProject);
router.get("/", CreateProyectos_1.InsertProyect);
router.get("/cantidad/estado", middlewareToken, Proyectos_1.getCantProyectForState);
router.get("/cantidad/region", middlewareToken, Proyectos_1.getCantProyectForRegion);
exports.default = router;
//# sourceMappingURL=ProyectosRouter.js.map