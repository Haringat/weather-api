import { Router } from "express";
import consumer from "./consumer";
import fallback from "./fallback";
import supplier from "./supplier";

const router = Router();

router.use("/consumer", consumer);
router.use("/supplier", supplier);

// fallback if no other route matches
router.all("/*", fallback);
router.connect("/*", fallback);

export default router;
