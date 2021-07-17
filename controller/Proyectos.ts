import {Request, Response} from "express";
import {ResponseCorrect, ResponseError} from "../constant/msgResponse";
import {
    AttributesExcludesProyectPreview,
    AttributesIncludesOneProyect,
    AttributesIncludesProyectPreview,
    AttributesExcludesFKProyect,
} from "../constant/tables";
import ModelProyecto from "../models/db/Proyecto";
import {Sequelize} from "sequelize";
import ModelEstadoProyecto from "../models/db/EstadoProyecto";
import ModelRegiones from "../models/db/Regiones";
import ModelCaracteristicas from "../models/db/Caracteristicas";
import {where} from "sequelize/types";
import ModelLocalizacion from "../models/db/Localizacion";

export const getProjectPreview = async (req: Request, res: Response) => {
    try {
        const size: any = req.query.size ? req.query["size"] : 4; // Make sure to parse the limit to number
        const skip: any = req.query.skip ? req.query["skip"] : 0;

        const {params} = req.body;

        if (params) {
            console.log(params);
            return;
        }

        const Proyects = await ModelProyecto.findAll({
            limit: parseInt(size),
            offset: parseInt(skip),
            attributes: {
                exclude: AttributesExcludesProyectPreview,
                include: AttributesIncludesProyectPreview,
            },
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

export const getCantProyectForState = async (req: Request, res: Response)=>
{

    const resp = await ModelEstadoProyecto.findAll({
        attributes: {
            include: [
                [Sequelize.literal(`(
            SELECT COUNT(*) FROM "Proyectos" AS p WHERE p."FkEstadoProyecto" = "EstadoProyecto"."id")`),
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

export const getCantProyectForRegion = async (req: Request, res: Response)=>
{


    const total = await ModelProyecto.count();
    const resp = await ModelLocalizacion.findAll({
        attributes: [
            'FkRegion',
            [Sequelize.fn('count', Sequelize.col('id')), 'cantidad'],
            [
                Sequelize.literal(`(
            SELECT "NameRegion" FROM "Regiones" AS r WHERE r.id = "Localizacion"."FkRegion")`),
                "NameRegion",
            ],
        ],
        group: ['FkRegion'],
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
        const CantProject = await ModelProyecto.findAll();
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
    const {id} = req.params;

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
