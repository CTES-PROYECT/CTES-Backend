import { Request, Response } from "express";
import { ResponseCorrect, ResponseError } from "../constant/msgResponse";
import {
    AttributesExcludesProyectPreview,
    AttributesIncludesOneProyect,
    AttributesIncludesProyectPreview,
    AttributesExcludesFKProyect,
    EstadoProyectosConstantes,
    Roles,
    EstadoSolicitudes,
    TipoSolicitudesConstantes,
    AttributesIncludesOneProyectUpdate,
} from "../constant/tables";
import ModelProyecto from "../models/db/Proyecto";
import { Op, Sequelize, where } from "sequelize";
import ModelEstadoProyecto from "../models/db/EstadoProyecto";
import ModelRegiones from "../models/db/Regiones";
import ModelLocalizacion from "../models/db/Localizacion";
import ModelClasificacion from "../models/db/Clasificacion";
import ModelComuna from "../models/db/Comuna";
import ModelContratista from "../models/db/Contratista";
import { getFkClasificacion, getFkEstado, getFkLocalization, getWhereProjectFilter } from "./utils/fuctions/FunctionsHelper";
import { token } from "morgan";
import { validatePermissionsForId, validatorRequest } from "./utils/validations";
import { helperCrearProyecto, helperCreateSolicitudNewProject } from "./utils/fuctions/CreateProyectos";
import ModelSolicitudesProyectos from "../models/db/SolicitudesProyectos";


export const getProjectPreview = async (req: Request, res: Response) => {
    try {
        const size: any = req.query.size ? req.query["size"] : 4; // Make sure to parse the limit to number
        const skip: any = req.query.skip ? req.query["skip"] : 0;

        const { params } = req.body;

        if (params) {
            const whereParmas = await getWhereProjectFilter(params)
            const ProyectsFilter = await ModelProyecto.findAll({
                attributes: {
                    exclude: AttributesExcludesProyectPreview,
                    include: AttributesIncludesProyectPreview,
                },
                where: whereParmas
            });
            return res.json({
                status: "OK",
                msg: ResponseCorrect.LoadProjectSuccefly,
                data: ProyectsFilter,
            });;
        }

        const Proyects = await ModelProyecto.findAll({
            limit: parseInt(size),
            offset: parseInt(skip),
            attributes: {
                exclude: AttributesExcludesProyectPreview,
                include: AttributesIncludesProyectPreview,
            },
            where: {
                Enabled: {
                    [Op.eq]: true
                }
            }
        });

        return res.json({
            status: "OK",
            msg: ResponseCorrect.LoadProjectSuccefly,
            data: Proyects,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "ERROR",
            msg: ResponseError.ErrorServidor,
        });
    }
};

export const getProjectPending = async (req: Request, res: Response) => {
    try {

        const solicitudes = await ModelSolicitudesProyectos.findAll({
            where: {
                [Op.and]: [
                    { FkEstadoSolicitud: EstadoSolicitudes.Pendiente, },
                    { FkTipoSolicitud: TipoSolicitudesConstantes.Agregar }
                ]
            }
        })

        const Proyects = await ModelProyecto.findAll({
            attributes: {
                exclude: AttributesExcludesProyectPreview,
                include: AttributesIncludesProyectPreview,
            },
            where: {
                id: {
                    [Op.in]: solicitudes.map(s => s.get().FkProyecto)
                }
            }
        });

        return res.json({
            status: "OK",
            msg: ResponseCorrect.LoadProjectSuccefly,
            data: Proyects,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "ERROR",
            msg: ResponseError.ErrorServidor,
        });
    }
};

export const getProjectPendingActualizacion = async (req: Request, res: Response) => {
    try {

        const solicitudes = await ModelSolicitudesProyectos.findAll({
            where: {
                [Op.and]: [
                    { FkEstadoSolicitud: EstadoSolicitudes.Pendiente, },
                    { FkTipoSolicitud: TipoSolicitudesConstantes.Actualizacion }
                ]
            }
        })

        const Proyects = await ModelProyecto.findAll({
            attributes: {
                exclude: AttributesExcludesProyectPreview,
                include: AttributesIncludesProyectPreview,
            },
            where: {
                id: {
                    [Op.in]: solicitudes.map(s => s.get().FkProyecto)
                }
            }
        });

        return res.json({
            status: "OK",
            msg: ResponseCorrect.LoadProjectSuccefly,
            data: Proyects,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "ERROR",
            msg: ResponseError.ErrorServidor,
        });
    }
};

export const getCantProyectForState = async (req: Request, res: Response) => {

    const resp = await ModelEstadoProyecto.findAll({
        attributes: {
            include: [
                [Sequelize.literal(`(
            SELECT COUNT(*) FROM "Proyectos" AS p WHERE p."FkEstadoProyecto" = "EstadoProyecto"."id" and p."Enabled" = 'true'  ) `),
                    "cantidad",]
            ],
        }
    });
    if (resp) {
        return res.json({
            status: '"OK',
            msg: ResponseCorrect.LoadInfoProject,
            data: resp
        })
    }
    return res.status(500).json({
        status: "ERROR",
        msg: ResponseError.ErrorServidor,
    });

}

export const getCantProyectForType = async (req: Request, res: Response) => {

    const resp = await ModelClasificacion.findAll({
        attributes: {
            include: [
                [Sequelize.literal(`(
            SELECT COUNT(*) FROM "Proyectos" AS p WHERE p."FkClasificacion" = "Clasificacion"."id" and p."Enabled" = 'true' )`),
                    "cantidad",]
            ],
        }
    });
    if (resp) {
        return res.json({
            status: '"OK',
            msg: ResponseCorrect.LoadInfoProject,
            data: resp.filter((p: any) => parseInt(p.get().cantidad) > 0)
        })
    }
    return res.status(500).json({
        status: "ERROR",
        msg: ResponseError.ErrorServidor,
    });

}

export const getCantProyectForRegion = async (req: Request, res: Response) => {


    const total = await ModelProyecto.count();

    const locationsNotValid= await ModelProyecto.findAll({
        where:{
            Enabled:{
                [Op.eq]:true
            }
        }
    });

    const resp = await ModelLocalizacion.findAll({
        attributes: [
            'FkRegion',
            [Sequelize.fn('count', Sequelize.col('id')), 'cantidad'],
            [
                Sequelize.literal(`(
            SELECT "NameRegion" FROM "Regiones" AS r WHERE r.id = "Localizacion"."FkRegion")`),
                "NameRegion",
            ],
            [Sequelize.literal(`(
                SELECT "id" FROM "Regiones" AS r WHERE r.id = "Localizacion"."FkRegion")`),
                "id",]
        ],
        group: ['FkRegion'],
        where:{
            id:{
                [Op.in]:locationsNotValid.map(l=>l.get().FkLocalizacion)
            }
        }
    });
    if (resp) {
        return res.json({
            status: '"OK',
            msg: ResponseCorrect.LoadInfoProject,
            data: {
                region: resp,
                total
            }
        })
    }
    return res.status(500).json({
        status: "ERROR",
        msg: ResponseError.ErrorServidor,
    });

}



export const getCantidadPrject = async (req: Request, res: Response) => {
    try {
        const CantProject = await ModelProyecto.findAll({
            where: {
                Enabled: {
                    [Op.eq]: true
                }
            }
        });
        res.json({
            status: "OK",
            msg: ResponseCorrect.LoadInfoProject,
            data: CantProject.length
        });
    } catch (e) {
        return res.status(500).json({
            status: "ERROR",
            msg: ResponseError.ErrorServidor,
        });
    }
}

export const getAllInfoProject = async (req: Request, res: Response) => {

    const { id } = req.params;

    const proyectForId = await ModelProyecto.findByPk(id, {
        attributes: {
            exclude: AttributesExcludesFKProyect,
            include: AttributesIncludesOneProyect,
        },
    });

    return res.json({
        status: "OK",
        msg: ResponseCorrect.LoadInfoProject,
        data: proyectForId,
    });
};

export const getUpdateAllInfoProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    const proyectForId = await ModelProyecto.findByPk(id, {
        attributes: {
            exclude: AttributesExcludesFKProyect,
            include: AttributesIncludesOneProyectUpdate,
        },
    });

    return res.json({
        status: "OK",
        msg: ResponseCorrect.LoadInfoProject,
        data: proyectForId,
    });
};

export const getCantTotalLongitud = async (req: Request, res: Response) => {
    const CantProject = await ModelProyecto.findAll({
        where: {
            FkEstadoProyecto: {
                [Op.eq]: EstadoProyectosConstantes.OPERACIONMANTENIMIENTO
            },
            Enabled: {
                [Op.eq]: true
            }
        },
        attributes: {
            exclude: AttributesExcludesFKProyect,
            include: [
                [
                    Sequelize.literal(`(
                            SELECT "m"."Longitud" FROM "Caracteristicas" AS m WHERE m.id = "Proyectos"."FkCaracteristicas")`),
                    "Longitud",
                ],
            ]
        },
    });

    let longitudTotal = 0;
    CantProject.forEach((p: any) => {
        if (p.Longitud !== null) {
            longitudTotal = longitudTotal + parseInt(p.get().Longitud);
        }
    })
    console.log(longitudTotal);
    return res.json({
        status: "OK",
        msg: ResponseCorrect.LoadInfoProject,
        data: longitudTotal / 1000,
    });

}

export const getRegionesComunas = async (req: Request, res: Response) => {

    try {
        const Regiones = await ModelRegiones.findAll({
            raw: true
        });
        return res.json({
            status: "OK",
            msg: ResponseCorrect.LoadInfoProject,
            data: Regiones
        });

    } catch (error) {
        console.log("error");
        return res.status(500).json({
            status: "ERROR",
            msg: ResponseError.ErrorServidor,
        });
    }

}

export const getMandantes = async (req: Request, res: Response) => {

    try {
        const Mandantes = await ModelContratista.findAll({
            raw: true
        });
        return res.json({
            status: "OK",
            msg: ResponseCorrect.LoadInfoProject,
            data: Mandantes
        });

    } catch (error) {
        console.log("error");
        return res.status(500).json({
            status: "ERROR",
            msg: ResponseError.ErrorServidor,
        });
    }

}

export const getComunasForRegion = async (req: Request, res: Response) => {

    try {
        const { idRegion } = req.params;
        const Comunas = await ModelComuna.findAll({
            raw: true,
            where: {
                FkRegion: {
                    [Op.eq]: idRegion
                }
            }
        });
        return res.json({
            status: "OK",
            msg: ResponseCorrect.LoadInfoProject,
            data: Comunas
        });

    } catch (error) {
        console.log("error");
        return res.status(500).json({
            status: "ERROR",
            msg: ResponseError.ErrorServidor,
        });
    }

}

export const addNewProject = async (req: Request, res: Response) => {
    const { idUser, form } = req.body;


    const premissions: boolean = await validatePermissionsForId(idUser, Roles.informador);

    if (!premissions) {
        return res.status(401).json({
            resp: 'ERROR',
            msg: 'Usuario sin autorizacion para la peticion'
        });
    }


    try {
        const p = await helperCrearProyecto(form);

        const solicitud = await helperCreateSolicitudNewProject({
            UserInformador: idUser,
            FkEstadoSolicitud: EstadoSolicitudes.Pendiente,
            FkTipoSolicitud: TipoSolicitudesConstantes.Agregar,
            FkProyecto: p

        })

        return res.json({
            status: 'OK',
            msg: 'Proyecto creado con exito'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'ERROR',
            msg: 'Error al crear proyecto'
        })
    }

}

export const putUpdateProject = async (req: Request, res: Response) => {
    const { idUser, form } = req.body;

    const { id } = req.params;


    const premissions: boolean = await validatePermissionsForId(idUser, Roles.informador);

    if (!premissions) {
        return res.status(401).json({
            resp: 'ERROR',
            msg: 'Usuario sin autorizacion para la peticion'
        });
    }


    try {
        const p = await helperCrearProyecto(form);

        const solicitud = await helperCreateSolicitudNewProject({
            UserInformador: idUser,
            FkEstadoSolicitud: EstadoSolicitudes.Pendiente,
            FkTipoSolicitud: TipoSolicitudesConstantes.Actualizacion,
            FkProyecto: p,
            FkProyectUpdate: parseInt(id)
        });

        return res.json({
            status: 'OK',
            msg: 'Proyecto actualizado con exito'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'ERROR',
            msg: 'Error al crear proyecto'
        })
    }

}


export const changeEnable = async (req: Request, res: Response) => {

    const validation = validatorRequest(req);
    if (validation) {
        return res.status(400).json(validation);
    }

    const { idUser, enable, idProject } = req.body;

    const premissions: boolean = await validatePermissionsForId(idUser, Roles.validador);


    if (!premissions) {
        return res.status(401).json({
            resp: 'ERROR',
            msg: 'Usuario sin autorizacion para la peticion'
        });
    }



    try {
        const solicitud = await ModelSolicitudesProyectos.findOne({
            where: {
                FkProyecto: {
                    [Op.eq]: idProject
                }
            }
        });
        const projectDelete = solicitud?.get().FkProyectUpdate;
        solicitud?.update({
            FkEstadoSolicitud: enable == true ? EstadoSolicitudes.Aceptado : EstadoSolicitudes.Rechazado,
            FkProyectUpdate: null
        });
        await solicitud?.save();
        await ModelSolicitudesProyectos.update({
            FkProyecto: solicitud?.get().FkProyecto,
        },{
            where:{
                FkProyecto:{
                    [Op.eq]:projectDelete
                }
            }
        })
        await ModelProyecto.destroy({
            where:{
                id:{
                    [Op.eq]:projectDelete
                }
            }
        })
        return res.json({
            status: 'OK',
            msg: 'Projecto Actualizado con exito'
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: 'ERROR',
            msg: 'Error al actualizar el projecto'
        })
    }

}


export const getProyectRejectForId = async (req: Request, res: Response) => {
    const { idUser } = req.body;

    const premissions: boolean = await validatePermissionsForId(idUser, Roles.informador);

    if (!premissions) {
        return res.status(401).json({
            resp: 'ERROR',
            msg: 'Usuario sin autorizacion para la peticion'
        });
    }

    try {

        const solicitudes = await ModelSolicitudesProyectos.findAll({
            where: {
                [Op.and]: [{
                    FkEstadoSolicitud: EstadoSolicitudes.Rechazado,
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

        const projects = await ModelProyecto.findAll({
            where: {
                id: {
                    [Op.in]: solicitudes.map(s => s.get().FkProyecto)
                }
            }
        });

        return res.json({
            status: 'ok',
            data: projects
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'ERROR',
            msg: 'Error al retornar proyectos'
        })
    }

}

export const getProyectPendingForId = async (req: Request, res: Response) => {
    const { idUser } = req.body;

    const premissions: boolean = await validatePermissionsForId(idUser, Roles.informador);

    if (!premissions) {
        return res.status(401).json({
            resp: 'ERROR',
            msg: 'Usuario sin autorizacion para la peticion'
        });
    }

    try {

        const solicitudes = await ModelSolicitudesProyectos.findAll({
            where: {
                [Op.and]: [{
                    FkEstadoSolicitud: EstadoSolicitudes.Pendiente,
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


        const projects = await ModelProyecto.findAll({
            where: {
                id: {
                    [Op.in]: solicitudes.map(s => s.get().FkProyecto)
                }
            }
        });

        return res.json({
            status: 'ok',
            data: projects
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'ERROR',
            msg: 'Error al retornar proyectos'
        })
    }

}
