import { DataTypes, Model } from "sequelize";
import db from "../../database/connect";
import ModelCaracteristicas from "./Caracteristicas";
import ModelClasificacion from "./Clasificacion";
import ModelContratista from "./Contratista";
import ModelDateProyecto from "./DateProyecto";
import ModelEstadoProyecto from "./EstadoProyecto";
import ModelLocalizacion from "./Localizacion";
import ModelMetodoConstructivo from "./MetodoConstructivo";
import ModelOfIngenieria from "./OfIngenieria";

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
    Enabled:{
      type:DataTypes.BOOLEAN,
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
    FkOfIngenieria: {
      type: DataTypes.INTEGER,
      references: {
        model: ModelOfIngenieria,
        key: "id",
      },
    },
  },
  
  {
    timestamps: false,
    freezeTableName: true,
  }
);


export default ModelProyecto;
