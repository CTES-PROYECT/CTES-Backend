import { DataTypes, Model } from "sequelize";
import db from "../../database/connect";

const ModelRoles = db.define(
  "Roles",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
//TODO: NULL is pendig || false is refuse || true is confirmed
export default ModelRoles;
