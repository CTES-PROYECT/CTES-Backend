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
exports.getProyectPendingForId = exports.getProyectRejectForId = exports.changeEnable = exports.putUpdateProject = exports.addNewProject = exports.getComunasForRegion = exports.getMandantes = exports.getRegionesComunas = exports.getCantTotalLongitud = exports.getAllInfoProject = exports.getCantidadPrject = exports.getCantProyectForRegion = exports.getCantProyectForType = exports.getCantProyectForState = exports.getProjectPendingActualizacion = exports.getProjectPending = exports.getProjectPreview = void 0;
const msgResponse_1 = require("../constant/msgResponse");
const tables_1 = require("../constant/tables");
const Proyecto_1 = __importDefault(require("../models/db/Proyecto"));
const sequelize_1 = require("sequelize");
const EstadoProyecto_1 = __importDefault(require("../models/db/EstadoProyecto"));
const Regiones_1 = __importDefault(require("../models/db/Regiones"));
const Localizacion_1 = __importDefault(require("../models/db/Localizacion"));
const Clasificacion_1 = __importDefault(require("../models/db/Clasificacion"));
const Comuna_1 = __importDefault(require("../models/db/Comuna"));
const Contratista_1 = __importDefault(require("../models/db/Contratista"));
const FunctionsHelper_1 = require("./utils/fuctions/FunctionsHelper");
const validations_1 = require("./utils/validations");
const CreateProyectos_1 = require("./utils/fuctions/CreateProyectos");
const SolicitudesProyectos_1 = __importDefault(require("../models/db/SolicitudesProyectos"));
const getProjectPreview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const size = req.query.size ? req.query["size"] : 4; // Make sure to parse the limit to number
        const skip = req.query.skip ? req.query["skip"] : 0;
        const { params } = req.body;
        if (params) {
            const whereParmas = yield FunctionsHelper_1.getWhereProjectFilter(params);
            const ProyectsFilter = yield Proyecto_1.default.findAll({
                attributes: {
                    exclude: tables_1.AttributesExcludesProyectPreview,
                    include: tables_1.AttributesIncludesProyectPreview,
                },
                where: whereParmas
            });
            return res.json({
                status: "OK",
                msg: msgResponse_1.ResponseCorrect.LoadProjectSuccefly,
                data: ProyectsFilter,
            });
            ;
        }
        const Proyects = yield Proyecto_1.default.findAll({
            limit: parseInt(size),
            offset: parseInt(skip),
            attributes: {
                exclude: tables_1.AttributesExcludesProyectPreview,
                include: tables_1.AttributesIncludesProyectPreview,
            },
            where: {
                Enabled: {
                    [sequelize_1.Op.eq]: true
                }
            }
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
const getProjectPending = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const solicitudes = yield SolicitudesProyectos_1.default.findAll({
            where: {
                [sequelize_1.Op.and]: [
                    { FkEstadoSolicitud: tables_1.EstadoSolicitudes.Pendiente, },
                    { FkTipoSolicitud: tables_1.TipoSolicitudesConstantes.Agregar }
                ]
            }
        });
        const Proyects = yield Proyecto_1.default.findAll({
            attributes: {
                exclude: tables_1.AttributesExcludesProyectPreview,
                include: tables_1.AttributesIncludesProyectPreview,
            },
            where: {
                id: {
                    [sequelize_1.Op.in]: solicitudes.map(s => s.get().FkProyecto)
                }
            }
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
exports.getProjectPending = getProjectPending;
const getProjectPendingActualizacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const solicitudes = yield SolicitudesProyectos_1.default.findAll({
            where: {
                [sequelize_1.Op.and]: [
                    { FkEstadoSolicitud: tables_1.EstadoSolicitudes.Pendiente, },
                    { FkTipoSolicitud: tables_1.TipoSolicitudesConstantes.Actualizacion }
                ]
            }
        });
        const Proyects = yield Proyecto_1.default.findAll({
            attributes: {
                exclude: tables_1.AttributesExcludesProyectPreview,
                include: tables_1.AttributesIncludesProyectPreview,
            },
            where: {
                id: {
                    [sequelize_1.Op.in]: solicitudes.map(s => s.get().FkProyecto)
                }
            }
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
exports.getProjectPendingActualizacion = getProjectPendingActualizacion;
const getCantProyectForState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield EstadoProyecto_1.default.findAll({
        attributes: {
            include: [
                [sequelize_1.Sequelize.literal(`(
            SELECT COUNT(*) FROM "Proyectos" AS p WHERE p."FkEstadoProyecto" = "EstadoProyecto"."id" and p."Enabled" = 'true'  ) `),
                    "cantidad",]
            ],
        }
    });
    if (resp) {
        return res.json({
            status: '"OK',
            msg: msgResponse_1.ResponseCorrect.LoadInfoProject,
            data: resp
        });
    }
    return res.status(500).json({
        status: "ERROR",
        msg: msgResponse_1.ResponseError.ErrorServidor,
    });
});
exports.getCantProyectForState = getCantProyectForState;
const getCantProyectForType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield Clasificacion_1.default.findAll({
        attributes: {
            include: [
                [sequelize_1.Sequelize.literal(`(
            SELECT COUNT(*) FROM "Proyectos" AS p WHERE p."FkClasificacion" = "Clasificacion"."id" and p."Enabled" = 'true' )`),
                    "cantidad",]
            ],
        }
    });
    if (resp) {
        return res.json({
            status: '"OK',
            msg: msgResponse_1.ResponseCorrect.LoadInfoProject,
            data: resp.filter((p) => parseInt(p.get().cantidad) > 0)
        });
    }
    return res.status(500).json({
        status: "ERROR",
        msg: msgResponse_1.ResponseError.ErrorServidor,
    });
});
exports.getCantProyectForType = getCantProyectForType;
const getCantProyectForRegion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const total = yield Proyecto_1.default.count();
    const resp = yield Localizacion_1.default.findAll({
        attributes: [
            'FkRegion',
            [sequelize_1.Sequelize.fn('count', sequelize_1.Sequelize.col('id')), 'cantidad'],
            [
                sequelize_1.Sequelize.literal(`(
            SELECT "NameRegion" FROM "Regiones" AS r WHERE r.id = "Localizacion"."FkRegion")`),
                "NameRegion",
            ],
            [sequelize_1.Sequelize.literal(`(
                SELECT "id" FROM "Regiones" AS r WHERE r.id = "Localizacion"."FkRegion")`),
                "id",]
        ],
        group: ['FkRegion'],
    });
    if (resp) {
        return res.json({
            status: '"OK',
            msg: msgResponse_1.ResponseCorrect.LoadInfoProject,
            data: {
                region: resp,
                total
            }
        });
    }
    return res.status(500).json({
        status: "ERROR",
        msg: msgResponse_1.ResponseError.ErrorServidor,
    });
});
exports.getCantProyectForRegion = getCantProyectForRegion;
const getCantidadPrject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const CantProject = yield Proyecto_1.default.findAll({
            where: {
                Enabled: {
                    [sequelize_1.Op.eq]: true
                }
            }
        });
        res.json({
            status: "OK",
            msg: msgResponse_1.ResponseCorrect.LoadInfoProject,
            data: CantProject.length
        });
    }
    catch (e) {
        return res.status(500).json({
            status: "ERROR",
            msg: msgResponse_1.ResponseError.ErrorServidor,
        });
    }
});
exports.getCantidadPrject = getCantidadPrject;
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
const getCantTotalLongitud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const CantProject = yield Proyecto_1.default.findAll({
        where: {
            FkEstadoProyecto: {
                [sequelize_1.Op.eq]: tables_1.EstadoProyectosConstantes.OPERACIONMANTENIMIENTO
            },
            Enabled: {
                [sequelize_1.Op.eq]: true
            }
        },
        attributes: {
            exclude: tables_1.AttributesExcludesFKProyect,
            include: [
                [
                    sequelize_1.Sequelize.literal(`(
                            SELECT "m"."Longitud" FROM "Caracteristicas" AS m WHERE m.id = "Proyectos"."FkCaracteristicas")`),
                    "Longitud",
                ],
            ]
        },
    });
    let longitudTotal = 0;
    CantProject.forEach((p) => {
        if (p.Longitud !== null) {
            longitudTotal = longitudTotal + parseInt(p.get().Longitud);
        }
    });
    console.log(longitudTotal);
    return res.json({
        status: "OK",
        msg: msgResponse_1.ResponseCorrect.LoadInfoProject,
        data: longitudTotal / 1000,
    });
});
exports.getCantTotalLongitud = getCantTotalLongitud;
const getRegionesComunas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Regiones = yield Regiones_1.default.findAll({
            raw: true
        });
        return res.json({
            status: "OK",
            msg: msgResponse_1.ResponseCorrect.LoadInfoProject,
            data: Regiones
        });
    }
    catch (error) {
        console.log("error");
        return res.status(500).json({
            status: "ERROR",
            msg: msgResponse_1.ResponseError.ErrorServidor,
        });
    }
});
exports.getRegionesComunas = getRegionesComunas;
const getMandantes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Mandantes = yield Contratista_1.default.findAll({
            raw: true
        });
        return res.json({
            status: "OK",
            msg: msgResponse_1.ResponseCorrect.LoadInfoProject,
            data: Mandantes
        });
    }
    catch (error) {
        console.log("error");
        return res.status(500).json({
            status: "ERROR",
            msg: msgResponse_1.ResponseError.ErrorServidor,
        });
    }
});
exports.getMandantes = getMandantes;
const getComunasForRegion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idRegion } = req.params;
        const Comunas = yield Comuna_1.default.findAll({
            raw: true,
            where: {
                FkRegion: {
                    [sequelize_1.Op.eq]: idRegion
                }
            }
        });
        return res.json({
            status: "OK",
            msg: msgResponse_1.ResponseCorrect.LoadInfoProject,
            data: Comunas
        });
    }
    catch (error) {
        console.log("error");
        return res.status(500).json({
            status: "ERROR",
            msg: msgResponse_1.ResponseError.ErrorServidor,
        });
    }
});
exports.getComunasForRegion = getComunasForRegion;
const addNewProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser, form } = req.body;
    const premissions = yield validations_1.validatePermissionsForId(idUser, tables_1.Roles.informador);
    if (!premissions) {
        return res.status(401).json({
            resp: 'ERROR',
            msg: 'Usuario sin autorizacion para la peticion'
        });
    }
    try {
        const p = yield CreateProyectos_1.helperCrearProyecto(form);
        const solicitud = yield CreateProyectos_1.helperCreateSolicitudNewProject({
            UserInformador: idUser,
            FkEstadoSolicitud: tables_1.EstadoSolicitudes.Pendiente,
            FkTipoSolicitud: tables_1.TipoSolicitudesConstantes.Agregar,
            FkProyecto: p
        });
        return res.json({
            status: 'OK',
            msg: 'Proyecto creado con exito'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'ERROR',
            msg: 'Error al crear proyecto'
        });
    }
});
exports.addNewProject = addNewProject;
const putUpdateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser, form, projectUpdate } = req.body;
    const premissions = yield validations_1.validatePermissionsForId(idUser, tables_1.Roles.informador);
    if (!premissions) {
        return res.status(401).json({
            resp: 'ERROR',
            msg: 'Usuario sin autorizacion para la peticion'
        });
    }
    try {
        const p = yield CreateProyectos_1.helperCrearProyecto(form);
        const solicitud = yield CreateProyectos_1.helperCreateSolicitudNewProject({
            UserInformador: idUser,
            FkEstadoSolicitud: tables_1.EstadoSolicitudes.Pendiente,
            FkTipoSolicitud: tables_1.TipoSolicitudesConstantes.Agregar,
            FkProyecto: p,
            FkProyectUpdate: projectUpdate
        });
        return res.json({
            status: 'OK',
            msg: 'Proyecto actualizado con exito'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'ERROR',
            msg: 'Error al crear proyecto'
        });
    }
});
exports.putUpdateProject = putUpdateProject;
const changeEnable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = validations_1.validatorRequest(req);
    if (validation) {
        return res.status(400).json(validation);
    }
    const { idUser, enable, idProject } = req.body;
    const premissions = yield validations_1.validatePermissionsForId(idUser, tables_1.Roles.validador);
    if (!premissions) {
        return res.status(401).json({
            resp: 'ERROR',
            msg: 'Usuario sin autorizacion para la peticion'
        });
    }
    try {
        const solicitud = yield SolicitudesProyectos_1.default.findOne({
            where: {
                FkProyecto: {
                    [sequelize_1.Op.eq]: idProject
                }
            }
        });
        console.log(enable);
        solicitud === null || solicitud === void 0 ? void 0 : solicitud.update({ FkEstadoSolicitud: enable == true ? tables_1.EstadoSolicitudes.Aceptado : tables_1.EstadoSolicitudes.Rechazado });
        yield (solicitud === null || solicitud === void 0 ? void 0 : solicitud.save());
        return res.json({
            status: 'OK',
            msg: 'Projecto Actualizado con exito'
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            status: 'ERROR',
            msg: 'Error al actualizar el projecto'
        });
    }
});
exports.changeEnable = changeEnable;
const getProyectRejectForId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.body;
    const premissions = yield validations_1.validatePermissionsForId(idUser, tables_1.Roles.informador);
    if (!premissions) {
        return res.status(401).json({
            resp: 'ERROR',
            msg: 'Usuario sin autorizacion para la peticion'
        });
    }
    try {
        const solicitudes = yield SolicitudesProyectos_1.default.findAll({
            where: {
                [sequelize_1.Op.and]: [{
                        FkEstadoSolicitud: tables_1.EstadoSolicitudes.Rechazado,
                    },
                    {
                        UserInformador: idUser
                    }
                ]
            }
        });
        if (solicitudes.length === 0) {
            return res.json({
                status: 'ok',
                data: []
            });
        }
        const projects = yield Proyecto_1.default.findAll({
            where: {
                id: {
                    [sequelize_1.Op.in]: solicitudes.map(s => s.get().FkProyecto)
                }
            }
        });
        return res.json({
            status: 'ok',
            data: projects
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'ERROR',
            msg: 'Error al retornar proyectos'
        });
    }
});
exports.getProyectRejectForId = getProyectRejectForId;
const getProyectPendingForId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.body;
    const premissions = yield validations_1.validatePermissionsForId(idUser, tables_1.Roles.informador);
    if (!premissions) {
        return res.status(401).json({
            resp: 'ERROR',
            msg: 'Usuario sin autorizacion para la peticion'
        });
    }
    try {
        const solicitudes = yield SolicitudesProyectos_1.default.findAll({
            where: {
                [sequelize_1.Op.and]: [{
                        FkEstadoSolicitud: tables_1.EstadoSolicitudes.Pendiente,
                    },
                    {
                        UserInformador: idUser
                    }
                ]
            }
        });
        if (solicitudes.length === 0) {
            return res.json({
                status: 'ok',
                data: []
            });
        }
        const projects = yield Proyecto_1.default.findAll({
            where: {
                id: {
                    [sequelize_1.Op.in]: solicitudes.map(s => s.get().FkProyecto)
                }
            }
        });
        return res.json({
            status: 'ok',
            data: projects
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'ERROR',
            msg: 'Error al retornar proyectos'
        });
    }
});
exports.getProyectPendingForId = getProyectPendingForId;
//# sourceMappingURL=Proyectos.js.map