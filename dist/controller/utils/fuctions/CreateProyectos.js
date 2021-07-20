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
exports.InsertProyect = void 0;
const Proyecto_1 = __importDefault(require("../../../models/db/Proyecto"));
const fs_1 = require("fs");
const CreateFK_1 = require("./CreateFK");
const InsertProyect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileContents = fs_1.readFileSync(`${__dirname}/convertcsv.json`, "utf-8");
        const Proyect = JSON.parse(fileContents);
        let data = [];
        let i = 1;
        for (const proyect of Proyect) {
            let tem = yield crearProyecto(proyect, i);
            data.push(tem);
            i++;
        }
        return res.json({
            data: data,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ err: error });
    }
});
exports.InsertProyect = InsertProyect;
const crearProyecto = (p, i) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const idContratista = yield CreateFK_1.createContratista({
        FullName: p.Mandante,
    });
    const idRegion = yield CreateFK_1.searchRegionFK(p.Region);
    const idCaracteristicas = yield CreateFK_1.createCaracteristicasFK({
        Longitud: (_a = p.mt) === null || _a === void 0 ? void 0 : _a.toString(),
    });
    const idLocation = yield CreateFK_1.createLocalizacion({
        FkRegion: idRegion,
    });
    const idClasificacion = yield CreateFK_1.searchClasificacionFK(p.Tipos_Tuneles);
    const idEstado = yield CreateFK_1.searchEstadoFK(p.Etapa);
    const project = yield Proyecto_1.default.create({
        NameProyecto: p.Nombre_Proyecto,
        FkEstadoProyecto: idEstado,
        FkContratista: idContratista,
        FkCaracteristicas: idCaracteristicas,
        FkLocalizacion: idLocation,
        FkClasificacion: idClasificacion
    }).then(() => console.log(`PROYECTO CREADO CON EXITO ${i}`)).
        catch(() => console.log(`PROYECTO ERROR ${i}`));
    return project;
});
//# sourceMappingURL=CreateProyectos.js.map