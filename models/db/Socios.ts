import { DataTypes } from "sequelize";
import db from "../../database/connect";

const ModelSocio = db.define(
  "Socios",
  {
    NameSocio: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },
    NumeroTelefono: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
//TODO: NULL is pendig || false is refuse || true is confirmed
export default ModelSocio;
