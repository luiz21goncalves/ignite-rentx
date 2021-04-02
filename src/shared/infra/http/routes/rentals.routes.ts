import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const rentalsRoutes = Router();
const createRentalController = new CreateRentalController();

rentalsRoutes.use(ensureAuthenticate);

rentalsRoutes.post("/", createRentalController.handle);

export { rentalsRoutes };
