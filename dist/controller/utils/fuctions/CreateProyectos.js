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
exports.helperCrearProyecto = void 0;
const Proyecto_1 = __importDefault(require("../../../models/db/Proyecto"));
const CreateFK_1 = require("./CreateFK");
const helperCrearProyecto = (p) => __awaiter(void 0, void 0, void 0, function* () {
    var idContratista = null;
    if (p.NombreMandante != null) {
        if (typeof p.NombreMandante !== "number") {
            idContratista = yield CreateFK_1.createContratista({
                FullName: p.NombreMandante,
            });
        }
    }
    const idCaracteristicas = yield CreateFK_1.createCaracteristicasFK({
        Longitud: p.Longitud,
        Pendiente: p.Pendiente,
        Seccion: p.Seccion
    });
    const FKDate = yield CreateFK_1.createFkDate({
        FechaInicioObras: p.FechaInicioObras,
        FechaLicitacion: p.FechaLicitacion,
        PlazoEjecucion: p.PlazoEjecucion
    });
    const idLocation = yield CreateFK_1.createLocalizacion({
        FkRegion: p.Region,
        FkComuna: p.Comuna
    });
    const FKOficina = yield CreateFK_1.createOficinasIng(p.Oficinas);
    var FkMetodoConstructivoInput = null;
    if (p.MetodoConstructivo !== null) {
        FkMetodoConstructivoInput = yield CreateFK_1.createMetodoConstructivo(p.MetodoConstructivo);
    }
    const project = yield Proyecto_1.default.create({
        NameProyecto: p.NombreProyecto,
        FkEstadoProyecto: p.Estado,
        FkContratista: (idContratista != null) ? idContratista : p.NombreMandante,
        FkCaracteristicas: idCaracteristicas,
        FkLocalizacion: idLocation,
        FkClasificacion: p.Sector,
        FkOfIngenieria: FKOficina,
        MontoInversion: p.MontoProyecto,
        FkDateProyecto: FKDate,
        FkMetodoConstructivo: FkMetodoConstructivoInput
    }).
        catch((e) => {
        console.log(e);
    });
    return project;
});
exports.helperCrearProyecto = helperCrearProyecto;
//# sourceMappingURL=CreateProyectos.js.map