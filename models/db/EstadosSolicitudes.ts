import { DataTypes } from "sequelize";
import db from "../../database/connect";

const ModelEstadosSolicitudes = db.define(
  "EstadosSolicitudes",
  {
    NameEstadoSolicitud: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default ModelEstadosSolicitudes;
