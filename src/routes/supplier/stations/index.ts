import { Router } from "express";
import add from "./add";

const stations = Router();

stations.post("/", add);

export default stations;
