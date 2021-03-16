import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationRoutes = Router();
const specificationRepository = new SpecificationsRepository();

specificationRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  try {
    const createSpecificationService = new CreateSpecificationService(
      specificationRepository
    );

    const specification = createSpecificationService.execute({
      name,
      description,
    });

    return response.status(201).json(specification);
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

export { specificationRoutes };
