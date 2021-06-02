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
exports.InsertProyect = void 0;
const tables_1 = require("../../../constant/tables");
const Contratista_1 = __importDefault(require("../../../models/db/Contratista"));
const Proyecto_1 = __importDefault(require("../../../models/db/Proyecto"));
const Proyectos = [
    {
        __EMPTY: 1,
        Nombre: "Construcción de OOCC piques, galerías y túneles tramo 4 Línea 7",
        Etapa: "Licitción",
        Fecha_Termino_etapa: 44547,
        "metodo constructivo": "NATM",
        mandante: "METRO S:A",
        comuna: "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
        Region: "Metropolitana",
        "Km de tunel": 26,
        estaciones: 19,
        "Empresa Ing": "CyD Ingenieria, Zañartu Consultores de Ingenieria, Subterra",
        "Fuente de Información": "metro.cl/licitaciones",
    },
    {
        __EMPTY: 2,
        Nombre: "Construcción de OOCC piques, galerías y túneles tramo 2 y 3 Línea 7",
        Etapa: "Licitción",
        Fecha_Termino_etapa: 44362,
        "metodo constructivo": "NATM",
        mandante: "METRO S:A",
        comuna: "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
        Region: "Metropolitana",
        "Km de tunel": 26,
        estaciones: 19,
        "Empresa Ing": "CyD Ingenieria, Zañartu Consultores de Ingenieria, Subterra",
        "Fuente de Información": "metro.cl/licitaciones",
    },
    {
        __EMPTY: 3,
        Nombre: "Construcción de OOCC piques, galerías y túneles tramo 1 Línea 7",
        Etapa: "Licitción",
        Fecha_Termino_etapa: 44250,
        "metodo constructivo": "TBM- EPM y NATM",
        mandante: "METRO S:A",
        comuna: "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
        Region: "Metropolitana",
        "Km de tunel": 26,
        estaciones: 19,
        "Empresa Ing": "CyD Ingenieria, Zañartu Consultores de Ingenieria, Subterra",
        "Fuente de Información": "metro.cl/licitaciones",
    },
    {
        __EMPTY: 4,
        Nombre: "Ingeniería de Detalle Estaciones Tramo B Línea 7",
        Etapa: "Licitción",
        Fecha_Termino_etapa: 44508,
        mandante: "METRO S:A",
        comuna: "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
        Region: "Metropolitana",
        "Km de tunel": 26,
        "Fuente de Información": "metro.cl/licitaciones",
    },
    {
        __EMPTY: 5,
        Nombre: "INSPECCIÓN T??CNICA DE OBRAS PROYECTO LÍNEA 7 TRAMOS 5 y 6",
        Etapa: "Licitción",
        Fecha_Termino_etapa: 44519,
        mandante: "METRO S:A",
        Region: "Metropolitana",
        "Fuente de Información": "metro.cl/licitaciones",
    },
    {
        __EMPTY: 6,
        Nombre: "INSPECCIÓN T??CNICA PARA EL MONTAJE, PRUEBAS Y PUESTA EN SERVICIO DE LOS SISTEMAS Y EQUIPAMIENTOS DEL PROYECTO EXTENSIÓN LÍNEA 3",
        Etapa: "Licitción",
        Fecha_Termino_etapa: 44407,
        mandante: "METRO S:A",
        Region: "Metropolitana",
        "Fuente de Información": "metro.cl/licitaciones",
    },
    {
        __EMPTY: 7,
        Nombre: "HABILITACI??N DE SISTEMAS DE SEGURIDAD PARA EL CIERRE PERIMETRAL ZONA ADYACENTE TALLER CERRILLOS LÍNEA 6",
        Fecha_Termino_etapa: 44413,
        mandante: "METRO S:A",
        Region: "Metropolitana",
        "Fuente de Información": "metro.cl/licitaciones",
    },
    {
        __EMPTY: 8,
        Nombre: "Obras Civiles de Ed?­culos Santa Lucía L1 y Baquedano L5, Metro de Santiago",
        Etapa: "En evaluación",
        Fecha_Termino_etapa: 44347,
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
        Fecha_Termino_etapa: 44417,
        mandante: "METRO S:A",
        comuna: "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
        Region: "Metropolitana",
        "Km de tunel": 26,
        "Fuente de Información": "metro.cl/licitaciones",
    },
    {
        __EMPTY: 10,
        Nombre: "CONSTRUCCIÓN DE OBRAS CIVILES DE ESTACIONES, EXTENSIÓN LÍNEA 2 ",
        Etapa: "Licitción",
        Fecha_Termino_etapa: 44392,
        mandante: "METRO S:A",
        comuna: "La Cisterna y San Bernando ",
        Region: "Metropolitana",
        "Km de tunel": 5.1,
        "Fuente de Información": "metro.cl/licitaciones",
    },
    {
        __EMPTY: 11,
        Nombre: "ESTUDIOS PARA LA INGENIERÍA BÁSICA DE SISTEMAS PARA LA EXTENSIÓN LÍNEA 6 DEL METRO DE SANTIAGO",
        Etapa: "Licitción",
        Fecha_Termino_etapa: 44377,
        mandante: "METRO S:A",
        Region: "Metropolitana",
        "Fuente de Información": "metro.cl/licitaciones",
    },
    {
        __EMPTY: 12,
        Nombre: "INSPECCIÓN T??CNICA DE OBRAS TRAMO 1 LÍNEA 7",
        Etapa: "En evaluación",
        Fecha_Termino_etapa: 44246,
        mandante: "METRO S:A",
        Region: "Metropolitana",
        "Fuente de Información": "metro.cl/licitaciones",
    },
    {
        __EMPTY: 13,
        Nombre: "INGENIERÍA CONCEPTUAL E INGENIERÍA BÁSICA PARA EXTENSIÓN LÍNEA 6, METRO DE SANTIAGO",
        Etapa: "En evaluación",
        Fecha_Termino_etapa: 44242,
        mandante: "METRO S:A",
        comuna: "Cerrillos",
        Region: "Metropolitana",
        "Km de tunel": 3,
        "Fuente de Información": "metro.cl/licitaciones",
    },
    {
        __EMPTY: 14,
        Nombre: "SUMINISTRO Y MANTENIMIENTO DEL SISTEMA DE VÍAS Y CATENARIAS PARA EL PROYECTO LÍNEA 7 DEL METRO DE SANTIAGO",
        Etapa: "Licitción",
        Fecha_Termino_etapa: 44560,
        mandante: "METRO S:A",
        comuna: "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
        Region: "Metropolitana",
        "Fuente de Información": "metro.cl/licitaciones",
    },
    {
        __EMPTY: 15,
        Nombre: "CONSTRUCCIÓN DE OBRAS CIVILES PIQUES, GALERÍAS Y TÚNELES TRAMO 5 Y 6 LÍNEA 7, METRO DE SANTIAGO",
        Etapa: "En evaluación",
        Fecha_Termino_etapa: 44295,
        mandante: "METRO S:A",
        comuna: "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
        Region: "Metropolitana",
        "Km de tunel": 26,
        "Empresa Ing": "CyD Ingenieria, Zañartu Consultores de Ingenieria, Subterra",
        "Fuente de Información": "metro.cl/licitaciones",
    },
    {
        __EMPTY: 16,
        Nombre: "CONSTRUCCIÓN DE OBRAS CIVILES PIQUES, GALERÍAS Y TÚNELES TRAMO 1 LÍNEA 7",
        Etapa: "En evaluación",
        Fecha_Termino_etapa: 44250,
        mandante: "METRO S:A",
        comuna: "Renca, Cerro Vania, Quinta Normal, Stgo, Providencia, Las Condes y Vitacura",
        Region: "Metropolitana",
        "Km de tunel": 26,
        "Empresa Ing": "CyD Ingenieria, Zañartu Consultores de Ingenieria, Subterra",
        "Fuente de Información": "metro.cl/licitaciones",
    },
    {
        __EMPTY: 17,
        Nombre: "Refuncionalización Fase1: Túnel caracoles",
        Etapa: "Licitción",
        Fecha_Termino_etapa: 44365,
        mandante: "MOP",
        Region: "Valparaiso",
        "Fuente de Información": "mercado publico",
    },
    {
        __EMPTY: 18,
        Nombre: "CONSTRUCCIÓN CENTRO CULTURAL DE HUECHURABA",
        Etapa: "Licitción",
        Fecha_Termino_etapa: 44364,
        mandante: "Iluste Municipalidad de Huechuraba",
        "Fuente de Información": "mercado publico",
    },
];
const InsertProyect = (req, res) => {
    try {
        const nombres = Proyectos.map((p) => __awaiter(void 0, void 0, void 0, function* () {
            if (p.mandante) {
                const resp = yield Contratista_1.default.findOne({
                    where: {
                        FullName: p.mandante,
                    },
                });
                const { id } = resp.get();
                const etapa = p.Etapa === "Licitción"
                    ? tables_1.EstadoProyectosConstantes.LICITACION
                    : tables_1.EstadoProyectosConstantes.EIADIA;
                try {
                    yield Proyecto_1.default.create({
                        NameProyecto: p.Nombre,
                        FkEstadoProyecto: etapa,
                        FkContratista: id,
                    });
                }
                catch (error) {
                    console.log(error);
                }
            }
            return { nombre: p.Nombre };
        }));
        return res.json(nombres);
    }
    catch (error) {
        return res.status(500).json({ err: error });
    }
};
exports.InsertProyect = InsertProyect;
//# sourceMappingURL=CreateProyectos.js.map