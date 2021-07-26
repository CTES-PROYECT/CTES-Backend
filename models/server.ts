import express, { Application } from "express";
import db from "../database/connect";
import routerUser from "../router/Usuarios";
import routerProyect from "../router/ProyectosRouter";
import morgan from "morgan";
import cors from "cors";

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.app.use(morgan("tiny"));
    this.port = process.env.PORT || "51000";

    this.middlewares();
    this.dataBaseConnection();
    this.router();
  }

  async dataBaseConnection() {
    try {
      await db.authenticate();
      console.log("conectado a la db");
    } catch (error) {
      console.log("ERROR EN LA DB\n" + error);
    }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor escuchando en puerto: " + this.port);
    });
  }
  router() {
    this.app.use("/api/users", routerUser);
    this.app.use("/api/projects", routerProyect);
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
}

export default Server;
