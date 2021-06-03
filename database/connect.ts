import { Sequelize } from "sequelize";

const db = new Sequelize("CTES", "postgres", "kevin1183", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

export default db;
