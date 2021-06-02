"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CreateProyectos_1 = require("../controller/utils/fuctions/CreateProyectos");
const router = express_1.Router();
router.get("/", CreateProyectos_1.InsertProyect);
exports.default = router;
//# sourceMappingURL=ProyectosRouter.js.map