import { AppError } from "@errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = await createCategoryUseCase.execute({
      name: "Categoy Test",
      description: "Category test description",
    });

    expect(category).toHaveProperty("id");
    expect(category).toMatchObject({
      name: "Categoy Test",
      description: "Category test description",
    });
  });

  it("should not be able to create a new category with name exists", async () => {
    await createCategoryUseCase.execute({
      name: "Categoy Test",
      description: "Category test description",
    });

    await expect(
      createCategoryUseCase.execute({
        name: "Categoy Test",
        description: "Category test description",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
