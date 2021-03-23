import { Router } from "express";
import multer from "multer";

import createCategory from "../modules/cars/useCases/createCategory";
import importCategory from "../modules/cars/useCases/importCategory";
import listCategories from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.get("/", (request, response) => {
  return listCategories().listCategoriesController.handle(request, response);
});

categoriesRoutes.post("/", (request, response) => {
  return createCategory().createCategoryController.handle(request, response);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  return importCategory().importCategoryController.handle(request, response);
});

export { categoriesRoutes };
