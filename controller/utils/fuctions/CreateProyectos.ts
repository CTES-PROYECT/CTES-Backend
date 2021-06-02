import { Request, Response } from "express";
import { Model, where } from "sequelize/types";
import { EstadoProyectosConstantes } from "../../../constant/tables";
import ModelContratista from "../../../models/db/Contratista";
import ModelDateProyecto from "../../../models/db/DateProyecto";
import ModelProyecto from "../../../models/db/Proyecto";

const Proyectos = [
  {
    __EMPTY: 1,
    Nombre: "Construcción de OOCC piques, galerías y túneles tramo 4 Línea 7",
    Etapa: "Licitción",
    Fecha_Termino_etapa: "12/17/2021",
    "metodo constructivo": "NATM",
    mandante: "METRO S:A",
    comuna:
      "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
    Region: "Metropolitana",
    "Km de tunel": 26,
    estaciones: 19,
    "Empresa Ing":
      "CyD Ingenieria, Zañartu Consultores de Ingenieria, Subterra",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 2,
    Nombre:
      "Construcción de OOCC piques, galerías y túneles tramo 2 y 3 Línea 7",
    Etapa: "Licitción",
    Fecha_Termino_etapa: "6/15/2021",
    "metodo constructivo": "NATM",
    mandante: "METRO S:A",
    comuna:
      "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
    Region: "Metropolitana",
    "Km de tunel": 26,
    estaciones: 19,
    "Empresa Ing":
      "CyD Ingenieria, Zañartu Consultores de Ingenieria, Subterra",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 3,
    Nombre: "Construcción de OOCC piques, galerías y túneles tramo 1 Línea 7",
    Etapa: "Licitción",
    Fecha_Termino_etapa: "2/23/2021",
    "metodo constructivo": "TBM- EPM y NATM",
    mandante: "METRO S:A",
    comuna:
      "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
    Region: "Metropolitana",
    "Km de tunel": 26,
    estaciones: 19,
    "Empresa Ing":
      "CyD Ingenieria, Zañartu Consultores de Ingenieria, Subterra",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 4,
    Nombre: "Ingeniería de Detalle Estaciones Tramo B Línea 7",
    Etapa: "Licitción",
    Fecha_Termino_etapa: "11/8/2021",
    mandante: "METRO S:A",
    comuna:
      "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
    Region: "Metropolitana",
    "Km de tunel": 26,
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 5,
    Nombre: "INSPECCIÓN T??CNICA DE OBRAS PROYECTO LÍNEA 7 TRAMOS 5 y 6",
    Etapa: "Licitción",
    Fecha_Termino_etapa: "11/19/2021",
    mandante: "METRO S:A",
    Region: "Metropolitana",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 6,
    Nombre:
      "INSPECCIÓN T??CNICA PARA EL MONTAJE, PRUEBAS Y PUESTA EN SERVICIO DE LOS SISTEMAS Y EQUIPAMIENTOS DEL PROYECTO EXTENSIÓN LÍNEA 3",
    Etapa: "Licitción",
    Fecha_Termino_etapa: "7/30/2021",
    mandante: "METRO S:A",
    Region: "Metropolitana",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 7,
    Nombre:
      "HABILITACI??N DE SISTEMAS DE SEGURIDAD PARA EL CIERRE PERIMETRAL ZONA ADYACENTE TALLER CERRILLOS LÍNEA 6",
    Fecha_Termino_etapa: "8/5/2021",
    mandante: "METRO S:A",
    Region: "Metropolitana",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 8,
    Nombre:
      "Obras Civiles de Ed?­culos Santa Lucía L1 y Baquedano L5, Metro de Santiago",
    Etapa: "En evaluación",
    Fecha_Termino_etapa: "5/31/2021",
    mandante: "METRO S:A",
    comuna: "Santiago",
    Region: "Metropolitana",
    "Empresa Ing": "IDOM",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 9,
    Nombre: "Ingeniería de Detalle Estaciones Tramo C Línea 7",
    Etapa: "Licitción",
    Fecha_Termino_etapa: "8/9/2021",
    mandante: "METRO S:A",
    comuna:
      "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
    Region: "Metropolitana",
    "Km de tunel": 26,
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 10,
    Nombre: "CONSTRUCCIÓN DE OBRAS CIVILES DE ESTACIONES, EXTENSIÓN LÍNEA 2 ",
    Etapa: "Licitción",
    Fecha_Termino_etapa: "7/15/2021",
    mandante: "METRO S:A",
    comuna: "La Cisterna y San Bernando ",
    Region: "Metropolitana",
    "Km de tunel": 5.1,
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 11,
    Nombre:
      "ESTUDIOS PARA LA INGENIERÍA BÁSICA DE SISTEMAS PARA LA EXTENSIÓN LÍNEA 6 DEL METRO DE SANTIAGO",
    Etapa: "Licitción",
    Fecha_Termino_etapa: "6/30/2021",
    mandante: "METRO S:A",
    Region: "Metropolitana",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 12,
    Nombre: "INSPECCIÓN T??CNICA DE OBRAS TRAMO 1 LÍNEA 7",
    Etapa: "En evaluación",
    Fecha_Termino_etapa: "2/19/2021",
    mandante: "METRO S:A",
    Region: "Metropolitana",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 13,
    Nombre:
      "INGENIERÍA CONCEPTUAL E INGENIERÍA BÁSICA PARA EXTENSIÓN LÍNEA 6, METRO DE SANTIAGO",
    Etapa: "En evaluación",
    Fecha_Termino_etapa: "2/15/2021",
    mandante: "METRO S:A",
    comuna: "Cerrillos",
    Region: "Metropolitana",
    "Km de tunel": 3,
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 14,
    Nombre:
      "SUMINISTRO Y MANTENIMIENTO DEL SISTEMA DE VÍAS Y CATENARIAS PARA EL PROYECTO LÍNEA 7 DEL METRO DE SANTIAGO",
    Etapa: "Licitción",
    Fecha_Termino_etapa: "12/30/2021",
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
    Fecha_Termino_etapa: "4/9/2021",
    mandante: "METRO S:A",
    comuna:
      "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
    Region: "Metropolitana",
    "Km de tunel": 26,
    "Empresa Ing":
      "CyD Ingenieria, Zañartu Consultores de Ingenieria, Subterra",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 16,
    Nombre:
      "CONSTRUCCIÓN DE OBRAS CIVILES PIQUES, GALERÍAS Y TÚNELES TRAMO 1 LÍNEA 7",
    Etapa: "En evaluación",
    Fecha_Termino_etapa: "2/23/2021",
    mandante: "METRO S:A",
    comuna:
      "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
    Region: "Metropolitana",
    "Km de tunel": 26,
    "Empresa Ing":
      "CyD Ingenieria, Zañartu Consultores de Ingenieria, Subterra",
    "Fuente de Información": "metro.cl/licitaciones",
  },
  {
    __EMPTY: 17,
    Nombre: "Refuncionalización Fase1: Túnel caracoles",
    Etapa: "Licitción",
    Fecha_Termino_etapa: "6/18/2021",
    mandante: "MOP",
    Region: "Valparaiso",
    "Fuente de Información": "mercado publico",
  },
  {
    __EMPTY: 18,
    Nombre: "CONSTRUCCIÓN CENTRO CULTURAL DE HUECHURABA",
    Etapa: "Licitción",
    Fecha_Termino_etapa: "6/17/2021",
    mandante: "Iluste Municipalidad de Huechuraba",
    "Fuente de Información": "mercado publico",
  },
];
export const InsertProyect = (req: Request, res: Response) => {
  try {
    const nombres = Proyectos.map(async (p) => {
      if(p.Fecha_Termino_etapa){
        
      }
      if (p.mandante) {
        const date : any= await ModelDateProyecto.create({
          FechaLicitacion:
        })
        const mandante: any = await ModelContratista.findOne({
          where: {
            FullName: p.mandante,
          },
        });
        const etapa =
          p.Etapa === "Licitción"
            ? EstadoProyectosConstantes.LICITACION
            : EstadoProyectosConstantes.EIADIA;

        try {
          await ModelProyecto.create({
            NameProyecto: p.Nombre,
            FkEstadoProyecto: etapa,
            FkContratista: mandante.get().id,
          });
        } catch (error) {
          console.log(error);
        }
      }
      return { nombre: p.Nombre };
    });
    return res.json(nombres);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};
