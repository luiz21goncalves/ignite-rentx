import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand 1",
      category_id: "category 1",
    });

    expect(car).toMatchObject({
      id: expect.any(String),
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand 1",
      category_id: "category 1",
    });
  });

  it("should be able to create a new car with available true bu default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand 1",
      category_id: "category 1",
    });

    expect(car).toMatchObject({
      id: expect.any(String),
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      available: true,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand 1",
      category_id: "category 1",
    });
  });

  it("should not be able to create a new car with exists license plate", async () => {
    const data = {
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand 1",
      category_id: "category 1",
    };

    await createCarUseCase.execute(data);

    await expect(
      createCarUseCase.execute({
        name: "Car 2",
        description: "Description car 2",
        daily_rate: 120,
        license_plate: data.license_plate,
        fine_amount: 80,
        brand: "Brand 2",
        category_id: "category 2",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
