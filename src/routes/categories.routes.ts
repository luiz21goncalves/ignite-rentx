import { Router } from "express";

import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get("/", (request, response) => {
  const categories = categoriesRepository.list();

  return response.json(categories);
});

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  try {
    const createCategoryService = new CreateCategoryService(
      categoriesRepository
    );

    const category = createCategoryService.execute({
      name,
      description,
    });

    return response.status(201).json(category);
  } catch (err) {
    return response.status(400).json({
      error: err.message,
    });
  }
});

export { categoriesRoutes };
