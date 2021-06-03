import { DataTypes } from "sequelize";
import db from "../../database/connect";
import ModelComuna from "./Comuna";
import ModelOfIngenieria from "./OfIngenieria";
import ModelRegiones from "./Regiones";

const ModelLocalizacion = db.define(
  "Localizacion",
  {
    Direccion: {
      type: DataTypes.STRING,
    },
    FkComuna: {
      type: DataTypes.INTEGER,
      references: {
        model: ModelComuna,
        key: "id",
      },
    },
    FkRegion: {
      type: DataTypes.INTEGER,
      references: {
        model: ModelRegiones,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default ModelLocalizacion;
