import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

import { ensuareAutheticate } from "../middlewares/ensuareAuthenticate";

const specificationRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(ensuareAutheticate);

specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
