interface Proyectos {
  NameProyecto?: string;
  TipoProyecto?: string;
  TipoContrato?: string;
  Descripcion?: string;
  MontoInversion?: string;
  FkDateProyecto?: number;
  FkMetodoConstructivo?: number;
  FkClasificacion?: number;
  FkEstadoProyecto?: number;
  FkCaracteristicas?: number;
  FkLocalizacion?: number;
  FkContratista?: number;
  FkOfIngenieria?: number;
}

interface Localizacion {
  Direccion?: string;
  FkComuna?: number;
  FkRegion?: number;
}

interface DateProyect {
  PlazoEjecucion?: string;
  FechaLicitacion?: string;
  FechaInicioObras?: string;
}

interface Contratista {
  FullName?: string;
  Email?: string;
  NumeroTelefono?: string;
}

interface Caracteristicas {
  Longitud?: string;
  Seccion?: string;
  Pendiente?: string;
}

interface Socios {
  NameSocio?: string;
  Email?: string;
  NumeroTelefono?: string;
}

interface SolicitudProyecto {
  Comment?: string;
  UserInformador: number;
  UserValidador?: number;
  FkEstadoSolicitud: number;
  FkProyecto: number;
  FkTipoSolicitud: number;
}

interface resultValidationToken {
  validation: boolean;
  id?: string;
}

export {
  Proyectos,
  Localizacion,
  DateProyect,
  Contratista,
  Caracteristicas,
  Socios,
  SolicitudProyecto,
  resultValidationToken,
};
