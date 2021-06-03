import { Router } from "express";
import { getProjectPreview } from "../controller/Proyectos";
import { InsertProyect } from "../controller/utils/fuctions/CreateProyectos";

const router = Router();

// api/projets/

router.get("/preview", getProjectPreview);
router.get("/", InsertProyect);

export default router;
