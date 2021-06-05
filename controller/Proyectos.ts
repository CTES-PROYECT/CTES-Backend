import { Request, Response } from "express";
import { ResponseCorrect, ResponseError } from "../constant/msgResponse";
import {
  AttributesExcludesProyectPreview,
  AttributesIncludesOneProyect,
  AttributesIncludesProyectPreview,
  AttributesExcludesFKProyect,
} from "../constant/tables";
import ModelProyecto from "../models/db/Proyecto";
import { resultValidationToken } from "../models/interfaces";
import { verifyBearerToken } from "./utils/validations";

export const getProjectPreview = async (req: Request, res: Response) => {
  try {
    const size: any = req.query.size ? req.query["size"] : 4; // Make sure to parse the limit to number
    const skip: any = req.query.skip ? req.query["skip"] : 0;

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
