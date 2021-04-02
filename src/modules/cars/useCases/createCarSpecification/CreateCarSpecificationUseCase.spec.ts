import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should be able to add a new specification to the car", async () => {
    const { id } = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand 1",
      category_id: "category 1",
    });

    const specification1 = await specificationsRepositoryInMemory.create({
      name: "Specification 1",
      description: "Description specification 1",
    });

    const specification2 = await specificationsRepositoryInMemory.create({
      name: "Specification 1",
      description: "Description specification 1",
    });

    const car = await createCarSpecificationUseCase.execute({
      car_id: id,
      specifications_id: [specification1.id, specification2.id],
    });

    expect(car.id).toEqual(id);
    expect(car.specifications).toEqual(
      expect.arrayContaining([specification1, specification2])
    );
  });

  it("should not be able to add a new specification to a now-existing car", async () => {
    await expect(
      createCarSpecificationUseCase.execute({
        car_id: "non-existing-car",
        specifications_id: ["dfghjklç"],
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
