import stationRoutes from "./stations";

export default [
    ...stationRoutes
];

/*
import { Router } from "express";
import stations from "./stations";

const supplierRouter = Router();

supplierRouter.use("/stations", stations);

export default supplierRouter;
*/
