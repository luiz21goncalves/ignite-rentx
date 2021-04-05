import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const rentalsRoutes = Router();
const createRentalController = new CreateRentalController();
const devolutionREntalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.use(ensureAuthenticate);

rentalsRoutes.post("/", createRentalController.handle);

rentalsRoutes.post("/devolution/:id", devolutionREntalController.handle);

rentalsRoutes.get("/user", listRentalsByUserController.handle);

export { rentalsRoutes };
