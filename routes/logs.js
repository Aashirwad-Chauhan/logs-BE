import express from "express";
import { getLogs, setLogs } from "../controllers/logs.js";

const router = express.Router();


router.get("/logs", getLogs);
router.post("/logsetter", setLogs);

export default router;