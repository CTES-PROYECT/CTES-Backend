import { Sequelize } from "sequelize";

const db = new Sequelize("CTES", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  logging: true,
});

export default db;
