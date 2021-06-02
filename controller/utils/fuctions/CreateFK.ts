import ModelCaracteristicas from "../../../models/db/Caracteristicas";
import ModelContratista from "../../../models/db/Contratista";

export async function createCaracteristicasFK(
  Longitud?: String,
  Seccion?: String,
  Pendiente?: String
): Promise<String> {
  const caracteristica = await ModelCaracteristicas.create({
    Longitud: Longitud ? Longitud : null,
    Seccion: Seccion ? Seccion : null,
    Pendiente: Pendiente ? Pendiente : null,
  });

  return caracteristica.get().id;
}

export async function createContratistaFK(
  FullName: String,
  Email: String,
  NumeroTelefono: String
) {
  const contratista = await ModelContratista.create({
    FullName: FullName ? FullName : null,
    Email: Email ? Email : null,
    NumeroTelefono: NumeroTelefono ? NumeroTelefono : null,
  });

  return contratista.get().id;
}
