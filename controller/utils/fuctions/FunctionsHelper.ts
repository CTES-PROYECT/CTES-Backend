
import { Op, Sequelize, WhereOptions } from "sequelize";


import { AllClasificacionesArray, EstadoProyectosConstantesArray } from "../../../constant/tables";
import ModelLocalizacion from "../../../models/db/Localizacion";

interface params {
    NombreProyecto: String,
    Estado: String,
    Sector: String,
    Region: string | number,
    Comuna: string | number,
    PlazoEjecucion: String,
    FechaAprobacion: { from: Date, to: Date },
    FechaIngreso: { from: Date, to: Date },
    NombreMandante: string | number,
    MontoProyecto: Array<number>,
    Longitud: Array<number>
}


export const getWhereProjectFilter = async (params: params) => {

    const stadoWhere = params.Estado != '' ? {
        [Op.eq]: getFkEstado(params.Estado)

    } : {
        [Op.or]: {
            [Op.is]: null,
            [Op.not]: null
        }
    };
    const clasificacionWhere = params.Sector != '' ? {
        [Op.eq]: getFkClasificacion(params.Sector)
    } : {
        [Op.or]: {
            [Op.is]: null,
            [Op.not]: null
        }
    };

    const loactionWhere = await getFkLocalization(params.Region, params.Comuna);

    const mandanteWhere = (params.NombreMandante != '') ? {
        [Op.eq]: params.NombreMandante,
    } : {
        [Op.or]: {
            [Op.is]: null,
            [Op.not]: null
        }
    };


    return {
        NameProyecto: {
            [Op.substring]: params.NombreProyecto.toUpperCase(),
        },
        FkEstadoProyecto: stadoWhere,
        FkClasificacion: clasificacionWhere,
        FkLocalizacion: loactionWhere,
        FkContratista: mandanteWhere
    };

}

export const getFkLocalization =async (Region: string | number,
    Comuna: string | number,) => {

    if (Comuna != '' && Region != '') {
        return {
            [Op.notIn]: Sequelize.literal(`SELECT * FROM "Localizacion" where "FkRegion"!=${Region}  AND "FkComuna"!=${Comuna} ;`)

        }
    } else if (Region != '') {
        console.log(Region);
        const array=await getArrayFkLocation(Region);
        return {
            [Op.in]: array
        }
    } else if (Comuna != '') {
        return {
            [Op.notIn]: Sequelize.literal(`SELECT * FROM "Localizacion" where "FkComuna"!=${Comuna};`)
        }
    }
    else {
        return {
            [Op.or]: {
                [Op.is]: null,
                [Op.not]: null
            }
        };
    }
}

export const getFkEstado = (estado: String) => {
    let idEstado: number = 0;
    EstadoProyectosConstantesArray.forEach((e) => {
        if (e.name === estado) {
            idEstado = e.id
        }
    });
    return idEstado;
}

const getArrayFkLocation=async (id:any)=>{
    const locations = await ModelLocalizacion.findAll({
        where:{
            FkRegion:{
                [Op.eq]:id
            }
        }
    });
    console.log(locations.length);
    return locations.map(l=>l.get().id);
}

export const getFkClasificacion = (sector: String) => {
    let idClasificacion: number = 0;
    AllClasificacionesArray.forEach((e) => {
        if (e.name.toUpperCase() === sector.toUpperCase()) {
            idClasificacion = e.id
        }
    });
     return idClasificacion;
}