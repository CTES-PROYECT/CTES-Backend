import express, { Application } from "express";
import db from "../database/connect";
import routerUser from "../router/Usuarios";
import routerProyect from "../router/ProyectosRouter";
import morgan from "morgan";
import cors from "cors";
import path from "path";

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

  private publicFolder(){

    const publicPath = path.resolve( __dirname, '../public' );
    this.app.use( express.static(publicPath) );

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor escuchando en puerto: " + this.port);
    });
    this.publicFolder();
  }
  router() {
    this.app.use("/api/users", routerUser);
    this.app.use("/api/projects", routerProyect);
  }
  middlewares() {
    var corsOptions = {
      origin: 'https://ctes.herokuapp.com/',
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
  }
}

export default Server;
