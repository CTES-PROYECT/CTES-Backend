import { ProjectionAlias, Sequelize } from "sequelize";

export const Roles = {
  validador: 2,
  socio: 1,
  informador: 3,
  admin: 4,
};

export const TipoSolicitudesConstantes = {
  Actualizacion: 1,
  Eliminar: 2,
  Agregar: 3,
};
export const EstadoProyectosConstantes = {
  EIADIA: 1,
  PREINVERSION: 2,
  INGENIERIA: 3,
  LICITACION: 4,
  CONSTRUCCION: 5,
  OPERACIONMANTENIMIENTO: 6,
};

export const EstadoSolicitudes = {
  Pendiente: 1,
  Aceptado: 2,
  Rechazado: 3
}

export const EstadoProyectosConstantesArray = [
  {name:"En evaluación",id: 1},
  {name:"SEIA",id: 1},
  {name:"PREINVERSION",id: 2},
  {name:"Ingeniería",id: 3},
  {name:"INGENIERIA",id: 3},
  {name:"Licitación",id: 4},
  {name:"Licitacion",id: 4},
  {name:"LICITACION",id: 4},
  {name:"Construcción",id: 5},
  {name:"Operación y Mantenimiento",id: 6},
  {name:"EIADIA",id: 1}
];

export const ClasificacionConstantes = {
  MINERO: 1,
  HIDRAULICO: 2,
  CIVIL: 3,
  ESPACIOSSUBTERRANEOS: 4,
};

export const AllClasificacionesArray =[
  {
    name:"Cívil",
    id:3
  },
  {
    name:"Civil",
    id:3
  },
  {
    name:"Espacios Subterráneos",
    id:4
  },{
    name:"Espacios Subterraneos",
    id:4
  },
  {
    name:"Minero",
    id:1
  }, {
    name:"Hidráulico",
    id:2
  },
  {
    name:"Hidraulico",
    id:2
  }
]

export const AttributesExcludesProyectPreview: string[] = [
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
];

export const AttributesExcludesFKProyect: string[] = [
  "FkDateProyecto",
  "FkMetodoConstructivo",
  "FkClasificacion",
  "FkEstadoProyecto",
  "FkCaracteristicas",
  "FkLocalizacion",
  "FkContratista",
  "FkOfIngenieria",
];

export const AttributesIncludesProyectPreview: (string | ProjectionAlias)[] = [
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
];


export const AttributesIncludesOneProyect: (string | ProjectionAlias)[] = [
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
  [
    Sequelize.literal(`(
      SELECT "DateProyecto"."FechaLicitacion"
      FROM "DateProyecto" 
      WHERE
           "DateProyecto"."id" = "Proyectos"."FkDateProyecto" )`),
    "FechaLicitacion",
  ],
  [
    Sequelize.literal(`(
      SELECT "DateProyecto"."FechaInicioObras"
      FROM "DateProyecto" 
      WHERE
           "DateProyecto"."id" = "Proyectos"."FkDateProyecto" )`),
    "FechaInicioObras",
  ],
  [
    Sequelize.literal(`(
      SELECT "DateProyecto"."PlazoEjecucion"
      FROM "DateProyecto" 
      WHERE
           "DateProyecto"."id" = "Proyectos"."FkDateProyecto" )`),
    "PlazoEjecucion",
  ],
  [
    Sequelize.literal(`(
            SELECT "m"."NameMetodo" FROM "MetodoConstructivo" AS m WHERE m.id = "Proyectos"."FkMetodoConstructivo")`),
    "MetodoConstructivo",
  ],
  [
    Sequelize.literal(`(
            SELECT "m"."NameClasificacion" FROM "Clasificacion" AS m WHERE m.id = "Proyectos"."FkClasificacion")`),
    "Clasificacion",
  ],

  [
    Sequelize.literal(`(
            SELECT "m"."Longitud" FROM "Caracteristicas" AS m WHERE m.id = "Proyectos"."FkCaracteristicas")`),
    "Longitud",
  ],

  [
    Sequelize.literal(`(
            SELECT "m"."Seccion" FROM "Caracteristicas" AS m WHERE m.id = "Proyectos"."FkCaracteristicas")`),
    "Seccion",
  ],

  [
    Sequelize.literal(`(
            SELECT "m"."Pendiente" FROM "Caracteristicas" AS m WHERE m.id = "Proyectos"."FkCaracteristicas")`),
    "Pendiente",
  ],
  [
    Sequelize.literal(`(
            SELECT "m"."FullName" FROM "Contratista" AS m WHERE m.id = "Proyectos"."FkContratista")`),
    "NameContratista",
  ],
  [
    Sequelize.literal(`(
            SELECT "m"."Email" FROM "Contratista" AS m WHERE m.id = "Proyectos"."FkContratista")`),
    "EmailContratista",
  ],
  [
    Sequelize.literal(`(
            SELECT "m"."NumeroTelefono" FROM "Contratista" AS m WHERE m.id = "Proyectos"."FkContratista")`),
    "NumeroTelefonoContratista",
  ],
  [
    Sequelize.literal(`(
            SELECT "m"."Direccion" FROM "OfIngenieria" AS m WHERE m.id = "Proyectos"."FkOfIngenieria")`),
    "DireccionOfIngenieria",
  ],
  [
    Sequelize.literal(`(
            SELECT "com"."NameComuna" FROM "OfIngenieria" AS ofcina inner join "Comunas" as com on ofcina."FkComuna"=com."id" WHERE ofcina.id = "Proyectos"."FkOfIngenieria")`),
    "ComunaOfIngenieria",
  ],
];


export const AttributesIncludesOneProyectUpdate: (string | ProjectionAlias)[] = [
  [
    Sequelize.literal(`(
            SELECT "id" FROM "EstadoProyecto" AS e WHERE e.id = "Proyectos"."FkEstadoProyecto")`),
    "Estado",
  ],
  [
    Sequelize.literal(`(
        SELECT "Regiones"."id"
        FROM "Localizacion" inner join "Regiones" on "Localizacion"."FkRegion" = "Regiones"."id"
        WHERE
             "Localizacion"."id" = "Proyectos"."FkLocalizacion")`),
    "Region",
  ],
  [
    Sequelize.literal(`(
        SELECT "Comunas"."id"
        FROM "Localizacion" inner join "Comunas" on "Localizacion"."FkComuna" = "Comunas"."id"
        WHERE
             "Localizacion"."id" = "Proyectos"."FkLocalizacion")`),
    "Comuna",
  ],
  [
    Sequelize.literal(`(
      SELECT "DateProyecto"."FechaLicitacion"
      FROM "DateProyecto" 
      WHERE
           "DateProyecto"."id" = "Proyectos"."FkDateProyecto" )`),
    "FechaLicitacion",
  ],
  [
    Sequelize.literal(`(
      SELECT "DateProyecto"."FechaInicioObras"
      FROM "DateProyecto" 
      WHERE
           "DateProyecto"."id" = "Proyectos"."FkDateProyecto" )`),
    "FechaInicioObras",
  ],
  [
    Sequelize.literal(`(
      SELECT "DateProyecto"."PlazoEjecucion"
      FROM "DateProyecto" 
      WHERE
           "DateProyecto"."id" = "Proyectos"."FkDateProyecto" )`),
    "PlazoEjecucion",
  ],
  [
    Sequelize.literal(`(
            SELECT "m"."NameMetodo" FROM "MetodoConstructivo" AS m WHERE m.id = "Proyectos"."FkMetodoConstructivo")`),
    "MetodoConstructivo",
  ],
  [
    Sequelize.literal(`(
            SELECT "m"."id" FROM "Clasificacion" AS m WHERE m.id = "Proyectos"."FkClasificacion")`),
    "Clasificacion",
  ],

  [
    Sequelize.literal(`(
            SELECT "m"."Longitud" FROM "Caracteristicas" AS m WHERE m.id = "Proyectos"."FkCaracteristicas")`),
    "Longitud",
  ],

  [
    Sequelize.literal(`(
            SELECT "m"."Seccion" FROM "Caracteristicas" AS m WHERE m.id = "Proyectos"."FkCaracteristicas")`),
    "Seccion",
  ],

  [
    Sequelize.literal(`(
            SELECT "m"."Pendiente" FROM "Caracteristicas" AS m WHERE m.id = "Proyectos"."FkCaracteristicas")`),
    "Pendiente",
  ],
  [
    Sequelize.literal(`(
            SELECT "m"."id" FROM "Contratista" AS m WHERE m.id = "Proyectos"."FkContratista")`),
    "NameContratista",
  ],
  [
    Sequelize.literal(`(
            SELECT "m"."Email" FROM "Contratista" AS m WHERE m.id = "Proyectos"."FkContratista")`),
    "EmailContratista",
  ],
  [
    Sequelize.literal(`(
            SELECT "m"."NumeroTelefono" FROM "Contratista" AS m WHERE m.id = "Proyectos"."FkContratista")`),
    "NumeroTelefonoContratista",
  ],
  [
    Sequelize.literal(`(
            SELECT "m"."Direccion" FROM "OfIngenieria" AS m WHERE m.id = "Proyectos"."FkOfIngenieria")`),
    "DireccionOfIngenieria",
  ],
  [
    Sequelize.literal(`(
            SELECT "com"."NameComuna" FROM "OfIngenieria" AS ofcina inner join "Comunas" as com on ofcina."FkComuna"=com."id" WHERE ofcina.id = "Proyectos"."FkOfIngenieria")`),
    "ComunaOfIngenieria",
  ],
];


export interface formAddProject{
  NombreProyecto: string,
  Estado: null | number,
  Sector:  null | number,
  Region:  null | number,
  Comuna:  null | number,
  PlazoEjecucion:  null | number,
  FechaLicitacion: any,
  FechaInicioObras: any,
  NombreMandante:  null | number | string,
  MontoProyecto:  null | number,
  Longitud:  null | number,
  Seccion:  null | string,
  Pendiente:  null | string,
  MetodoConstructivo:  null | string,
  Oficinas:  null | string
}