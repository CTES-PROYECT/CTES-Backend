"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Proyectos_1 = require("../controller/Proyectos");
const CreateProyectos_1 = require("../controller/utils/fuctions/CreateProyectos");
const router = express_1.Router();
// api/projets/
router.get("/preview", Proyectos_1.getProjectPreview);
router.get("/", CreateProyectos_1.InsertProyect);
exports.default = router;
//# sourceMappingURL=ProyectosRouter.js.map