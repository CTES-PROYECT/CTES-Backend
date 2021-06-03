import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { ResponseError } from "../constant/msgResponse";
import ModelProyecto from "../models/db/Proyecto";

export const getProjectPreview = async (req: Request, res: Response) => {
  try {
    const size: any = req.query.size ? req.query["size"] : 4; // Make sure to parse the limit to number
    const skip: any = req.query.skip ? req.query["skip"] : 0;

    const Proyects = await ModelProyecto.findAll({
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
            Sequelize.literal(`(
                  SELECT "NameState" FROM "EstadoProyecto" AS e WHERE e.id = "Proyectos"."FkEstadoProyecto")`),
            "Estado",
          ],
          [
            Sequelize.literal(`(
              SELECT "Regiones"."NameRegion"
              FROM "Localizacion" inner join "Regiones" on "Localizacion"."FkRegion" = "Regiones"."id"
              WHERE
                   "Localizacion"."id" = "Proyectos"."FkLocalizacion")`),
            "Region",
          ],
          [
            Sequelize.literal(`(
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "ERROR",
      msg: ResponseError.ErrorServidor,
    });
  }
};
