import { Request, Response } from "express";
import { Model, where } from "sequelize/types";
import { EstadoProyectosConstantes, formAddProject } from "../../../constant/tables";
import ModelContratista from "../../../models/db/Contratista";
import ModelDateProyecto from "../../../models/db/DateProyecto";
import ModelProyecto from "../../../models/db/Proyecto";
import { Proyectos, SolicitudProyecto } from "../../../models/interfaces";
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
  createOficinasIng,
  createFkDate,
  createMetodoConstructivo,
} from "./CreateFK";
import ModelSolicitudesProyectos from "../../../models/db/SolicitudesProyectos";




export const helperCrearProyecto = async (p: formAddProject) => {
  var idContratista = null;
if(p.NombreMandante!=null){
  if(typeof p.NombreMandante !== "number"){
     idContratista = await createContratista({
      FullName: p.NombreMandante,
    });
  }
}
  


  const idCaracteristicas = await createCaracteristicasFK({
    Longitud: p.Longitud,
    Pendiente:p.Pendiente,
    Seccion:p.Seccion
  });

  const FKDate = await createFkDate({
    FechaInicioObras:p.FechaInicioObras,
    FechaLicitacion:p.FechaLicitacion,
    PlazoEjecucion:p.PlazoEjecucion
  });


  const idLocation = await createLocalizacion({
    FkRegion: p.Region,
    FkComuna:p.Comuna
  });


  const FKOficina= await createOficinasIng(p.Oficinas);
  
  var FkMetodoConstructivoInput =null;
  if(p.MetodoConstructivo!==null){
    FkMetodoConstructivoInput = await createMetodoConstructivo(p.MetodoConstructivo);

  }

  const project : Model = await ModelProyecto.create({
    NameProyecto: p.NombreProyecto,
    FkEstadoProyecto: p.Estado,
    FkContratista: (idContratista!=null) ? idContratista : p.NombreMandante,
    FkCaracteristicas: idCaracteristicas,
    FkLocalizacion: idLocation,
    FkClasificacion:p.Sector,
    FkOfIngenieria:FKOficina,
    MontoInversion:p.MontoProyecto,
    FkDateProyecto:FKDate,
    FkMetodoConstructivo:FkMetodoConstructivoInput
  }).
  catch((e)=>{
    console.log(e);
    throw e;
  });

  return project.get().id;
};


export const helperCreateSolicitudNewProject = async (s: SolicitudProyecto )=>{

  return await ModelSolicitudesProyectos.create(s);

}
