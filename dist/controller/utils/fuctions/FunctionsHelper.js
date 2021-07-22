"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFkClasificacion = exports.getFkEstado = exports.getFkLocalization = exports.getWhereProjectFilter = void 0;
const sequelize_1 = require("sequelize");
const tables_1 = require("../../../constant/tables");
const getWhereProjectFilter = (params) => {
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
    const loactionWhere = exports.getFkLocalization(params.Region, params.Comuna);
    const mandanteWhere = (params.NombreMandante != '') ? {
        [sequelize_1.Op.eq]: params.NombreMandante,
    } : {
        [sequelize_1.Op.or]: {
            [sequelize_1.Op.is]: null,
            [sequelize_1.Op.not]: null
        }
    };
    return {
        NameProyecto: {
            [sequelize_1.Op.substring]: params.NombreProyecto.toUpperCase(),
        },
        FkEstadoProyecto: stadoWhere,
        FkClasificacion: clasificacionWhere,
        FkLocalizacion: loactionWhere,
        FkContratista: mandanteWhere
    };
};
exports.getWhereProjectFilter = getWhereProjectFilter;
const getFkLocalization = (Region, Comuna) => {
    if (Comuna != '' && Region != '') {
        return {
            [sequelize_1.Op.notIn]: sequelize_1.Sequelize.literal(`SELECT * FROM "Localizacion" where "FkRegion"!=${Region}  AND "FkComuna"!=${Comuna} ;`)
        };
    }
    else if (Region != '') {
        return {
            [sequelize_1.Op.notIn]: sequelize_1.Sequelize.literal(`SELECT * FROM "Localizacion" where "FkRegion"!=${Region};`)
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
};
exports.getFkLocalization = getFkLocalization;
const getFkEstado = (estado) => {
    let idEstado = 0;
    tables_1.EstadoProyectosConstantesArray.forEach((e) => {
        if (e.name === estado) {
            idEstado = e.id;
        }
    });
    return idEstado;
};
exports.getFkEstado = getFkEstado;
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