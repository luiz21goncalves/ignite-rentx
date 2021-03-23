import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

interface IRespose {
  createCategoryController: CreateCategoryController;
  createCategoryUseCase: CreateCategoryUseCase;
}

export default (): IRespose => {
  const categoriesRepository = new CategoriesRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  );
  return { createCategoryController, createCategoryUseCase };
};
