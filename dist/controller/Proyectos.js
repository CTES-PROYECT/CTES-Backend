"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectPreview = void 0;
const sequelize_1 = require("sequelize");
const msgResponse_1 = require("../constant/msgResponse");
const Proyecto_1 = __importDefault(require("../models/db/Proyecto"));
const getProjectPreview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const size = req.query.size ? req.query["size"] : 4; // Make sure to parse the limit to number
        const skip = req.query.skip ? req.query["skip"] : 0;
        const Proyects = yield Proyecto_1.default.findAll({
            limit: parseInt(size),
            offset: parseInt(skip),
            attributes: {
                exclude: [
                    "TipoContrato",
                    "TipoProyecto",
                    "MontoInversion",
                    "FkDateProyecto",
                    "FkMetodoConstructivo",
                    "FkClasificacion",
                    "FkEstadoProyecto",
                    "FkCaracteristicas",
                    "FkLocalizacion",
                    "FkContratista",
                    "FkOfIngenieria",
                ],
                include: [
                    [
                        sequelize_1.Sequelize.literal(`(
                  SELECT "NameState" FROM "EstadoProyecto" AS e WHERE e.id = "Proyectos"."FkEstadoProyecto")`),
                        "Estado",
                    ],
                    [
                        sequelize_1.Sequelize.literal(`(
              SELECT "Regiones"."NameRegion"
              FROM "Localizacion" inner join "Regiones" on "Localizacion"."FkRegion" = "Regiones"."id"
              WHERE
                   "Localizacion"."id" = "Proyectos"."FkLocalizacion")`),
                        "Region",
                    ],
                    [
                        sequelize_1.Sequelize.literal(`(
              SELECT "Comunas"."NameComuna"
              FROM "Localizacion" inner join "Comunas" on "Localizacion"."FkComuna" = "Comunas"."id"
              WHERE
                   "Localizacion"."id" = "Proyectos"."FkLocalizacion")`),
                        "Comuna",
                    ],
                ],
            },
        });
        return res.json({
            msg: "Proyectos cargados exitosamente",
            data: Proyects,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "ERROR",
            msg: msgResponse_1.ResponseError.ErrorServidor,
        });
    }
});
exports.getProjectPreview = getProjectPreview;
//# sourceMappingURL=Proyectos.js.map