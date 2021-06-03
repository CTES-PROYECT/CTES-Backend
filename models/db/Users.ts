import { DataTypes } from "sequelize";
import db from "../../database/connect";
import ModelRoles from "./Roles";
import ModelSocio from "./Socios";

const ModelUsers = db.define(
  "Users",
  {
    FullName: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },
    Password: {
      type: DataTypes.STRING,
    },
    EstadoUser: {
      type: DataTypes.BOOLEAN,
      defaultValue: null,
    },
    RolUser: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      references: {
        model: ModelRoles,
        key: "id",
      },
    },
    FkSocio: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      references: {
        model: ModelSocio,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);
//TODO: NULL is pendig || false is refuse || true is confirmed
export default ModelUsers;
