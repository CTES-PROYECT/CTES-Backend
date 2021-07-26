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
exports.getFkClasificacion = exports.getFkEstado = exports.getFkLocalization = exports.getWhereProjectFilter = void 0;
const sequelize_1 = require("sequelize");
const tables_1 = require("../../../constant/tables");
const Localizacion_1 = __importDefault(require("../../../models/db/Localizacion"));
const getWhereProjectFilter = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const stadoWhere = params.Estado != '' ? {
        [sequelize_1.Op.eq]: exports.getFkEstado(params.Estado)
    } : {
        [sequelize_1.Op.or]: {
            [sequelize_1.Op.is]: null,
            [sequelize_1.Op.not]: null
        }
    };
    const clasificacionWhere = params.Sector != '' ? {
        [sequelize_1.Op.eq]: exports.getFkClasificacion(params.Sector)
    } : {
        [sequelize_1.Op.or]: {
            [sequelize_1.Op.is]: null,
            [sequelize_1.Op.not]: null
        }
    };
    const loactionWhere = yield exports.getFkLocalization(params.Region, params.Comuna);
    const mandanteWhere = (params.NombreMandante != '') ? {
        [sequelize_1.Op.eq]: params.NombreMandante,
    } : {
        [sequelize_1.Op.or]: {
            [sequelize_1.Op.is]: null,
            [sequelize_1.Op.not]: null
        }
    };
    return {
        [sequelize_1.Op.or]: [
            {
                NameProyecto: {
                    [sequelize_1.Op.substring]: params.NombreProyecto.toUpperCase(),
                },
            }, {
                NameProyecto: {
                    [sequelize_1.Op.substring]: params.NombreProyecto.toLowerCase(),
                },
            },
            {
                NameProyecto: {
                    [sequelize_1.Op.substring]: params.NombreProyecto,
                },
            }
        ],
        FkEstadoProyecto: stadoWhere,
        FkClasificacion: clasificacionWhere,
        FkLocalizacion: loactionWhere,
        FkContratista: mandanteWhere,
        Enabled: {
            [sequelize_1.Op.eq]: true
        }
    };
});
exports.getWhereProjectFilter = getWhereProjectFilter;
const getFkLocalization = (Region, Comuna) => __awaiter(void 0, void 0, void 0, function* () {
    if (Comuna != '' && Region != '') {
        return {
            [sequelize_1.Op.notIn]: sequelize_1.Sequelize.literal(`SELECT * FROM "Localizacion" where "FkRegion"!=${Region}  AND "FkComuna"!=${Comuna} ;`)
        };
    }
    else if (Region != '') {
        console.log(Region);
        const array = yield getArrayFkLocation(Region);
        return {
            [sequelize_1.Op.in]: array
        };
    }
    else if (Comuna != '') {
        return {
            [sequelize_1.Op.notIn]: sequelize_1.Sequelize.literal(`SELECT * FROM "Localizacion" where "FkComuna"!=${Comuna};`)
        };
    }
    else {
        return {
            [sequelize_1.Op.or]: {
                [sequelize_1.Op.is]: null,
                [sequelize_1.Op.not]: null
            }
        };
    }
});
exports.getFkLocalization = getFkLocalization;
const getFkEstado = (estado) => {
    let idEstado = 0;
    tables_1.EstadoProyectosConstantesArray.forEach((e) => {
        if (e.name.toUpperCase() === estado.toUpperCase()) {
            idEstado = e.id;
        }
    });
    return idEstado;
};
exports.getFkEstado = getFkEstado;
const getArrayFkLocation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const locations = yield Localizacion_1.default.findAll({
        where: {
            FkRegion: {
                [sequelize_1.Op.eq]: id
            }
        }
    });
    console.log(locations.length);
    return locations.map(l => l.get().id);
});
const getFkClasificacion = (sector) => {
    let idClasificacion = 0;
    tables_1.AllClasificacionesArray.forEach((e) => {
        if (e.name.toUpperCase() === sector.toUpperCase()) {
            idClasificacion = e.id;
        }
    });
    return idClasificacion;
};
exports.getFkClasificacion = getFkClasificacion;
//# sourceMappingURL=FunctionsHelper.js.map