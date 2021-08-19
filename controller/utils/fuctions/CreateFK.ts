import { Op } from "sequelize";
import { AllClasificacionesArray, EstadoProyectosConstantesArray } from "../../../constant/tables";
import ModelCaracteristicas from "../../../models/db/Caracteristicas";
import ModelContratista from "../../../models/db/Contratista";
import ModelDateProyecto from "../../../models/db/DateProyecto";
import ModelLocalizacion from "../../../models/db/Localizacion";
import ModelMetodoConstructivo from "../../../models/db/MetodoConstructivo";
import ModelOfIngenieria from "../../../models/db/OfIngenieria";
import ModelProyecto from "../../../models/db/Proyecto";
import ModelRegiones from "../../../models/db/Regiones";
import ModelSocio from "../../../models/db/Socios";
import ModelSolicitudesProyectos from "../../../models/db/SolicitudesProyectos";
import {
  Caracteristicas,
  Contratista,
  DateProyect,
  Localizacion,
  Proyectos,
  Socios,
  SolicitudProyecto,
} from "../../../models/interfaces";

export async function createCaracteristicasFK(
  caract: Caracteristicas
): Promise<number | undefined> {
  const caracteristica = await ModelCaracteristicas.create({
    ...caract,
  });

  return caracteristica.get().id;
}

export async function createFkDate(
  caract: DateProyect
): Promise<number> {
  const caracteristica = await ModelDateProyecto.create({
    ...caract,
  });

  return caracteristica.get().id;
}


export const createContratistaFK = async (
  contratista: Contratista
): Promise<number | undefined> => {
  const exist = await ModelContratista.findOne({
    where: {
      FullName: { [Op.eq]: contratista.FullName },
    },
  });

  if (exist == null) {
    const contra = await ModelContratista.create(contratista);
    return contra.get().id;
  } else {
    const { id } = exist.get();
    return id;
  }
};

export const createContratista = (contratista: Contratista) =>
  new Promise(async (resolve) => {
    const exist = await ModelContratista.findOne({
      where: {
        FullName: { [Op.eq]: contratista.FullName },
      },
    });
    if (exist == null) {
      const contra = await ModelContratista.create(contratista);
      resolve(contra.get().id);
    } else {
      const { id } = exist.get();
      resolve(id);
    }
  });

export async function createDateProyectFK(
  dateProject: DateProyect
): Promise<number | undefined> {
  const DateProyecto = await ModelDateProyecto.create({
    ...dateProject,
  });
  return DateProyecto.get().id;
}

export async function createLocalizacion(
  location: Localizacion
): Promise<number | undefined> {
  const loc = await ModelLocalizacion.create({
    ...location,
  });
  return loc.get().id;
}

export async function createOficinasIng(
  dir: string | null
): Promise<number | undefined> {
  const loc = await ModelOfIngenieria.create({
    Direccion:dir,
  });
  return loc.get().id;
}



export async function createMetodoConstructivo(
  NameMetodo: string
): Promise<number | undefined> {
  const exist = await ModelMetodoConstructivo.findOne({
    where: {
      NameMetodo: NameMetodo.toUpperCase(),
    },
  });
  if (exist) {
    return exist.get().id;
  }

  const metodoConstuctivo = await ModelMetodoConstructivo.create({
    NameMetodo: NameMetodo.toUpperCase(),
  });

  return metodoConstuctivo.get().id;
}

export async function createOfIngenieria(
  Direccion?: string,
  FkComuna?: number
): Promise<number | undefined> {
  const existe = await ModelOfIngenieria.findOne({
    where: {
      Direccion: Direccion,
      FkComuna: FkComuna,
    },
    raw: true,
    lock: true,
  });
  if (existe) {
    return existe.get().id;
  }
  const ofIngenieria = await ModelOfIngenieria.create({
    Direccion: Direccion ? Direccion : null,
    FkComuna: FkComuna ? FkComuna : null,
  });

  return ofIngenieria.get().id;
}

export async function createProyecto(project: Proyectos) {
  try {
    await ModelProyecto.create(project);
  } catch (error) {
    console.log(error);
  }
}

export async function createSocio(socio: Socios): Promise<number | undefined> {
  const sc = await ModelSocio.create({
    ...socio,
  });

  return sc.get().id;
}

export async function createSolicitudProyecto(solicitud: SolicitudProyecto) {
  const sp = await ModelSolicitudesProyectos.create({
    ...solicitud,
  });
  return sp.get().id;
}

export async function searchRegionFK(region: string) {
  const reg = await ModelRegiones.findOne({
    where: {
      NameRegion: { [Op.like]: `%${region}%` },
    },
  });
  return reg?.get().id;
}

export async function searchClasificacionFK(tipo: string) {
  let id;
  AllClasificacionesArray.forEach((c)=>{
    if(c.name===tipo){
      id=c.id
    }
  })
  return id;
}

export async function searchEstadoFK(tipo: string) {
  let id;
  EstadoProyectosConstantesArray.forEach((c)=>{
    if(c.name===tipo){
      id=c.id
    }
  })
  return id;
}
