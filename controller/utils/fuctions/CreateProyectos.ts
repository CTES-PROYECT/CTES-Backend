import { Request, Response } from "express";
import { Model, where } from "sequelize/types";
import { EstadoProyectosConstantes } from "../../../constant/tables";
import ModelContratista from "../../../models/db/Contratista";
import ModelDateProyecto from "../../../models/db/DateProyecto";
import ModelProyecto from "../../../models/db/Proyecto";
import { Proyectos } from "../../../models/interfaces";
import { readFileSync } from 'fs';


import {
  createDateProyectFK,
  createContratistaFK,
  searchRegionFK,
  createCaracteristicasFK,
  createProyecto,
  createLocalizacion,
  createContratista,
  searchClasificacionFK,
  searchEstadoFK,
} from "./CreateFK";


export const InsertProyect = async (req: Request, res: Response) => {
  try {

    const fileContents = readFileSync(`${__dirname}/convertcsv.json`, "utf-8");
		const Proyect = JSON.parse(fileContents);
    let data =[];let i=1;
    for (const proyect of Proyect) {
      let tem=await crearProyecto(proyect,i);
      data.push(tem);
      i++;
    }
    return res.json({
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: error });
  }
};

const crearProyecto = async (p: any,i :number) => {
  

  const idContratista = await createContratista({
    FullName: p.Mandante,
  });

  const idRegion = await searchRegionFK(p.Region);

  const idCaracteristicas = await createCaracteristicasFK({
    Longitud: p.mt?.toString(),
  });

  const idLocation = await createLocalizacion({
    FkRegion: idRegion,
  });

  const idClasificacion = await searchClasificacionFK(
    p.Tipos_Tuneles
  )

  const idEstado = await searchEstadoFK(
    p.Etapa
  )


  const project = await ModelProyecto.create({
    NameProyecto: p.Nombre_Proyecto,
    FkEstadoProyecto: idEstado,
    FkContratista: idContratista,
    FkCaracteristicas: idCaracteristicas,
    FkLocalizacion: idLocation,
    FkClasificacion:idClasificacion
    
  }).then(()=>console.log(`PROYECTO CREADO CON EXITO ${i}`)).
  catch(()=>console.log(`PROYECTO ERROR ${i}`));

  return project;
};
