import { DataTypes } from "sequelize";
import db from "../../database/connect";

const ModelMetodoConstructivo = db.define(
  "MetodoConstructivo",
  {
    NameMetodo: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default ModelMetodoConstructivo;
