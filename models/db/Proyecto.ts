import { DataTypes, Model } from "sequelize";
import db from "../../database/connect";
import ModelCaracteristicas from "./Caracteristicas";
import ModelClasificacion from "./Clasificacion";
import ModelContratista from "./Contratista";
import ModelDateProyecto from "./DateProyecto";
import ModelEstadoProyecto from "./EstadoProyecto";
import ModelLocalizacion from "./Localizacion";
import ModelMetodoConstructivo from "./MetodoConstructivo";

const ModelProyecto = db.define(
  "Proyectos",
  {
    NameProyecto: {
      type: DataTypes.STRING,
    },
    TipoProyecto: {
      type: DataTypes.STRING,
    },
    TipoContrato: {
      type: DataTypes.STRING,
    },
    Descripcion: {
      type: DataTypes.STRING,
    },
    MontoInversion: {
      type: DataTypes.INTEGER,
    },
    FkDateProyecto: {
      type: DataTypes.INTEGER,
      references: {
        model: ModelDateProyecto,
        key: "id",
      },
    },
    FkMetodoConstructivo: {
      type: DataTypes.INTEGER,
      references: {
        model: ModelMetodoConstructivo,
        key: "id",
      },
    },
    FkClasificacion: {
      type: DataTypes.INTEGER,
      references: {
        model: ModelClasificacion,
        key: "id",
      },
    },
    FkEstadoProyecto: {
      type: DataTypes.INTEGER,
      references: {
        model: ModelEstadoProyecto,
        key: "id",
      },
    },
    FkCaracteristicas: {
      type: DataTypes.INTEGER,
      references: {
        model: ModelCaracteristicas,
        key: "id",
      },
    },
    FkLocalizacion: {
      type: DataTypes.INTEGER,
      references: {
        model: ModelLocalizacion,
        key: "id",
      },
    },
    FkContratista: {
      type: DataTypes.INTEGER,
      references: {
        model: ModelContratista,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

export default ModelProyecto;
