import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const carsRoutes = Router();
const createCarController = new CreateCarController();

carsRoutes.use(ensureAuthenticate);
carsRoutes.use(ensureAdmin);

carsRoutes.post("/", createCarController.handle);

export { carsRoutes };
