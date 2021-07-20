import { Sequelize } from "sequelize";

const db = new Sequelize("CTES", "postgres", "kevin1183", {
  host: "localhost",
  dialect: "postgres",
  logging: true,
  
});

export default db;
