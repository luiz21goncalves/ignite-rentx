import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

interface IResponse {
  listCategoriesController: ListCategoriesController;
  listCategoriesUseCase: ListCategoriesUseCase;
}

export default (): IResponse => {
  const categoriesRepository = new CategoriesRepository();
  const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
  const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase
  );
  return { listCategoriesController, listCategoriesUseCase };
};
