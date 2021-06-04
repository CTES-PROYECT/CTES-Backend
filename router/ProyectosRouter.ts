import { Router } from "express";
import { getAllInfoProject, getProjectPreview } from "../controller/Proyectos";
import { InsertProyect } from "../controller/utils/fuctions/CreateProyectos";

const router = Router();

// api/projects/

router.get("/preview", getProjectPreview);
router.get("/:id", getAllInfoProject);
router.get("/", InsertProyect);

export default router;
