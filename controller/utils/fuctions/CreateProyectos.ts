import { Request, Response } from "express";
import { Model, where } from "sequelize/types";
import { EstadoProyectosConstantes } from "../../../constant/tables";
import ModelContratista from "../../../models/db/Contratista";
import ModelDateProyecto from "../../../models/db/DateProyecto";
import ModelProyecto from "../../../models/db/Proyecto";
import { Proyectos } from "../../../models/interfaces";
import {
  createDateProyectFK,
  createContratistaFK,
  searchRegionFK,
  createCaracteristicasFK,
  createProyecto,
  createLocalizacion,
  createContratista,
} from "./CreateFK";

const Proyect = [
  {
    __EMPTY: 1,
    Nombre: "Construcción de OOCC piques, galerías y túneles tramo 4 Línea 7",
    Etapa: "Licitación",
    Fecha: "Thu Dec 16 2021 21:00:00 GMT-0300 (GMT-03:00)",
    "metodo constructivo": "NATM",
    mandante: "METRO S:A",
    comuna:
      "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
    Region: "Metropolitana",
    longitud: 26,
    estaciones: 19,
    "Empresa Ing":
      "CyD Ingenieria, Zañartu Consultores de Ingenieria, Subterra",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 2,
    Nombre:
      "Construcción de OOCC piques, galerías y túneles tramo 2 y 3 Línea 7",
    Etapa: "Licitación",
    Fecha: "Mon Jun 14 2021 20:00:00 GMT-0400 (GMT-04:00)",
    "metodo constructivo": "NATM",
    mandante: "METRO S:A",
    comuna:
      "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
    Region: "Metropolitana",
    longitud: 26,
    estaciones: 19,
    "Empresa Ing":
      "CyD Ingenieria, Zañartu Consultores de Ingenieria, Subterra",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 3,
    Nombre: "Construcción de OOCC piques, galerías y túneles tramo 1 Línea 7",
    Etapa: "Licitación",
    Fecha: "Mon Feb 22 2021 21:00:00 GMT-0300 (GMT-03:00)",
    "metodo constructivo": "TBM- EPM y NATM",
    mandante: "METRO S:A",
    comuna:
      "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
    Region: "Metropolitana",
    longitud: 26,
    estaciones: 19,
    "Empresa Ing":
      "CyD Ingenieria, Zañartu Consultores de Ingenieria, Subterra",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 4,
    Nombre: "Ingeniería de Detalle Estaciones Tramo B Línea 7",
    Etapa: "Licitación",
    Fecha: "Sun Nov 07 2021 21:00:00 GMT-0300 (GMT-03:00)",
    mandante: "METRO S:A",
    comuna:
      "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
    Region: "Metropolitana",
    longitud: 26,
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 5,
    Nombre: "INSPECCIÓN TÉCNICA DE OBRAS PROYECTO LÍNEA 7 TRAMOS 5 y 6",
    Etapa: "Licitación",
    Fecha: "Thu Nov 18 2021 21:00:00 GMT-0300 (GMT-03:00)",
    mandante: "METRO S:A",
    Region: "Metropolitana",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 6,
    Nombre:
      "INSPECCIÓN TÉCNICA PARA EL MONTAJE, PRUEBAS Y PUESTA EN SERVICIO DE LOS SISTEMAS Y EQUIPAMIENTOS DEL PROYECTO EXTENSIÓN LÍNEA 3",
    Etapa: "Licitación",
    Fecha: "Thu Jul 29 2021 20:00:00 GMT-0400 (GMT-04:00)",
    mandante: "METRO S:A",
    Region: "Metropolitana",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 7,
    Nombre:
      "HABILITACIÓN DE SISTEMAS DE SEGURIDAD PARA EL CIERRE PERIMETRAL ZONA ADYACENTE TALLER CERRILLOS LÍNEA 6",
    Fecha: "Wed Aug 04 2021 20:00:00 GMT-0400 (GMT-04:00)",
    mandante: "METRO S:A",
    Region: "Metropolitana",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 8,
    Nombre:
      "Obras Civiles de Edículos Santa Lucía L1 y Baquedano L5, Metro de Santiago",
    Etapa: "En evaluación",
    Fecha: "Sun May 30 2021 20:00:00 GMT-0400 (GMT-04:00)",
    mandante: "METRO S:A",
    comuna: "Santiago",
    Region: "Metropolitana",
    "Empresa Ing": "IDOM",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 9,
    Nombre: "Ingeniería de Detalle Estaciones Tramo C Línea 7",
    Etapa: "Licitación",
    Fecha: "Sun Aug 08 2021 20:00:00 GMT-0400 (GMT-04:00)",
    mandante: "METRO S:A",
    comuna:
      "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
    Region: "Metropolitana",
    longitud: 26,
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 10,
    Nombre: "CONSTRUCCIÓN DE OBRAS CIVILES DE ESTACIONES, EXTENSIÓN LÍNEA 2 ",
    Etapa: "Licitación",
    Fecha: "Wed Jul 14 2021 20:00:00 GMT-0400 (GMT-04:00)",
    mandante: "METRO S:A",
    comuna: "La Cisterna y San Bernando ",
    Region: "Metropolitana",
    longitud: 5.1,
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 11,
    Nombre:
      "ESTUDIOS PARA LA INGENIERÍA BÁSICA DE SISTEMAS PARA LA EXTENSIÓN LÍNEA 6 DEL METRO DE SANTIAGO",
    Etapa: "Licitación",
    Fecha: "Tue Jun 29 2021 20:00:00 GMT-0400 (GMT-04:00)",
    mandante: "METRO S:A",
    Region: "Metropolitana",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 12,
    Nombre: "INSPECCIÓN TÉCNICA DE OBRAS TRAMO 1 LÍNEA 7",
    Etapa: "En evaluación",
    Fecha: "Thu Feb 18 2021 21:00:00 GMT-0300 (GMT-03:00)",
    mandante: "METRO S:A",
    Region: "Metropolitana",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 13,
    Nombre:
      "INGENIERÍA CONCEPTUAL E INGENIERÍA BÁSICA PARA EXTENSIÓN LÍNEA 6, METRO DE SANTIAGO",
    Etapa: "En evaluación",
    Fecha: "Sun Feb 14 2021 21:00:00 GMT-0300 (GMT-03:00)",
    mandante: "METRO S:A",
    comuna: "Cerrillos",
    Region: "Metropolitana",
    longitud: 3,
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 14,
    Nombre:
      "SUMINISTRO Y MANTENIMIENTO DEL SISTEMA DE VÍAS Y CATENARIAS PARA EL PROYECTO LÍNEA 7 DEL METRO DE SANTIAGO",
    Etapa: "Licitación",
    Fecha: "Wed Dec 29 2021 21:00:00 GMT-0300 (GMT-03:00)",
    mandante: "METRO S:A",
    comuna:
      "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
    Region: "Metropolitana",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 15,
    Nombre:
      "CONSTRUCCIÓN DE OBRAS CIVILES PIQUES, GALERÍAS Y TÚNELES TRAMO 5 Y 6 LÍNEA 7, METRO DE SANTIAGO",
    Etapa: "En evaluación",
    Fecha: "Thu Apr 08 2021 20:00:00 GMT-0400 (GMT-04:00)",
    mandante: "METRO S:A",
    comuna:
      "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
    Region: "Metropolitana",
    longitud: 26,
    "Empresa Ing":
      "CyD Ingenieria, Zañartu Consultores de Ingenieria, Subterra",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 16,
    Nombre:
      "CONSTRUCCIÓN DE OBRAS CIVILES PIQUES, GALERÍAS Y TÚNELES TRAMO 1 LÍNEA 7",
    Etapa: "En evaluación",
    Fecha: "Mon Feb 22 2021 21:00:00 GMT-0300 (GMT-03:00)",
    mandante: "METRO S:A",
    comuna:
      "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
    Region: "Metropolitana",
    longitud: 26,
    "Empresa Ing":
      "CyD Ingenieria, Zañartu Consultores de Ingenieria, Subterra",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 17,
    Nombre: "Implementación de Desvíos de Tránsito para el Proyecto Línea 7",
    Etapa: "Licitación",
    Fecha: "Wed Jul 14 2021 20:00:00 GMT-0400 (GMT-04:00)",
    mandante: "METRO S:A",
    comuna:
      "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
    Region: "Metropolitana",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 18,
    Nombre: "Refuncionalización Fase1: Túnel caracoles",
    Etapa: "Licitación",
    Fecha: "Thu Jun 17 2021 20:00:00 GMT-0400 (GMT-04:00)",
    mandante: "MOP",
    Region: "Valparaiso",
    "Fuente de Información": "mercado publico",
  },
  {
    __EMPTY: 19,
    Nombre: "CONSTRUCCIÓN CENTRO CULTURAL DE HUECHURABA",
    Etapa: "Licitación",
    Fecha: "Wed Jun 16 2021 20:00:00 GMT-0400 (GMT-04:00)",
    mandante: "Iluste Municipalidad de Huechuraba",
    comuna: "Huechuraba",
    Region: "Metropolitana",
    longitud: "2343,26 m2 ",
    "Fuente de Información": "mercado publico",
  },
  {
    __EMPTY: 20,
    Nombre: "Explotación Mina Pampita",
    Etapa: "SEIA",
    Fecha: "Wed May 12 2021 20:00:00 GMT-0400 (GMT-04:00)",
    RCA: "aprobada",
    mandante: "MINERA DEL NORTE SPA",
    Region: "Antofagasta",
    "Fuente de Información": "seia.sea.gob.cl/",
  },
];
export const InsertProyect = async (req: Request, res: Response) => {
  try {
    const k = Proyect.map(async (p, i) => {
      return await crearProyecto(p);
    });
    return res.json({
      data: k,
    });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

const crearProyecto = async (p: any) => {
  const idFecha = await createDateProyectFK({
    FechaLicitacion: p.Fecha,
  });

  const idContratista = await createContratista({
    FullName: p.mandante,
  });

  const idRegion = await searchRegionFK(p.Region);

  const idCaracteristicas = await createCaracteristicasFK({
    Longitud: p.longitud?.toString(),
  });

  const idLocation = await createLocalizacion({
    FkRegion: idRegion,
  });

  return ModelProyecto.create({
    NameProyecto: p.Nombre,
    FkEstadoProyecto: 1,
    FkDateProyecto: idFecha,
    FkContratista: idContratista,
    FkCaracteristicas: idCaracteristicas,
    FkLocalizacion: idLocation,
  });
};
