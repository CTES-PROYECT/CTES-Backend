import { DataTypes } from "sequelize";
import db from "../../database/connect";
import ModelRegiones from "./Regiones";

const ModelComuna = db.define(
  "Comunas",
  {
    NameComuna: {
      type: DataTypes.STRING,
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

export default ModelComuna;
