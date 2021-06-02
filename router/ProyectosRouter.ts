import { Router } from "express";
import { InsertProyect } from "../controller/utils/fuctions/CreateProyectos";

const router = Router();

router.get("/", InsertProyect);

export default router;
