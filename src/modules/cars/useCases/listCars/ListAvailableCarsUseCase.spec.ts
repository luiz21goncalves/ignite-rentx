import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand 1",
      category_id: "category 1",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Description car 2",
      daily_rate: 120,
      license_plate: "QWE-1234",
      fine_amount: 80,
      brand: "Brand 2",
      category_id: "category 2",
    });

    const car3 = await carsRepositoryInMemory.create({
      name: "Car 3",
      description: "Description car 3",
      daily_rate: 120,
      license_plate: "QWE-0875",
      fine_amount: 80,
      brand: "Brand 1",
      category_id: "category 2",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toHaveLength(3);
    expect(cars).toEqual([car1, car2, car3]);
  });

  it("should be able to list all available cars by name", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand 1",
      category_id: "category 1",
    });

    await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Description car 2",
      daily_rate: 120,
      license_plate: "QWE-1234",
      fine_amount: 80,
      brand: "Brand 2",
      category_id: "category 2",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car 1",
    });

    expect(cars).toHaveLength(1);
    expect(cars).toEqual([car1]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand 1",
      category_id: "category 1",
    });

    await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Description car 2",
      daily_rate: 120,
      license_plate: "QWE-1234",
      fine_amount: 80,
      brand: "Brand 2",
      category_id: "category 2",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Brand 1",
    });

    expect(cars).toHaveLength(1);
    expect(cars).toEqual([car1]);
  });

  it("should be able to list all available cars by cartegory_id", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand 1",
      category_id: "category 1",
    });

    await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Description car 2",
      daily_rate: 120,
      license_plate: "QWE-1234",
      fine_amount: 80,
      brand: "Brand 2",
      category_id: "category 2",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category 1",
    });

    expect(cars).toHaveLength(1);
    expect(cars).toEqual([car1]);
  });
});
