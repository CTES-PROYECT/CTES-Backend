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
exports.getAllInfoProject = exports.getProjectPreview = void 0;
const msgResponse_1 = require("../constant/msgResponse");
const tables_1 = require("../constant/tables");
const Proyecto_1 = __importDefault(require("../models/db/Proyecto"));
const getProjectPreview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const size = req.query.size ? req.query["size"] : 4; // Make sure to parse the limit to number
        const skip = req.query.skip ? req.query["skip"] : 0;
        const Proyects = yield Proyecto_1.default.findAll({
            limit: parseInt(size),
            offset: parseInt(skip),
            attributes: {
                exclude: tables_1.AttributesExcludesProyectPreview,
                include: tables_1.AttributesIncludesProyectPreview,
            },
        });
        return res.json({
            status: "OK",
            msg: msgResponse_1.ResponseCorrect.LoadProjectSuccefly,
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
const getAllInfoProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const proyectForId = yield Proyecto_1.default.findByPk(id, {
        attributes: {
            exclude: tables_1.AttributesExcludesFKProyect,
            include: tables_1.AttributesIncludesOneProyect,
        },
    });
    return res.json({
        status: "OK",
        msg: msgResponse_1.ResponseCorrect.LoadInfoProject,
        data: proyectForId,
    });
});
exports.getAllInfoProject = getAllInfoProject;
//# sourceMappingURL=Proyectos.js.map