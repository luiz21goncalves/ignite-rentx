import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryController } from "./importCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

interface IResponse {
  importCategoryController: ImportCategoryController;
  importCategoryUseCase: ImportCategoryUseCase;
}

export default (): IResponse => {
  const categoriesRepository = new CategoriesRepository();
  const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
  const importCategoryController = new ImportCategoryController(
    importCategoryUseCase
  );

  return { importCategoryController, importCategoryUseCase };
};
