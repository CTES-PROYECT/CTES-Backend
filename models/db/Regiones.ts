import { DataTypes } from "sequelize";
import db from "../../database/connect";

const ModelRegiones = db.define(
  "Regiones",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    NameRegion: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default ModelRegiones;
