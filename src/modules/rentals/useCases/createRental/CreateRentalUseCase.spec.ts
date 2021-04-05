import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/Providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const dateAdd24Hours = dayjs().add(24, "hours").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create new rental", async () => {
    const { id } = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand 1",
      category_id: "category 1",
    });

    const rental = await createRentalUseCase.execute({
      car_id: id,
      user_id: "763y4uhwbesdx",
      expected_return_date: dateAdd24Hours,
    });

    expect(rental).toMatchObject({
      id: expect.any(String),
      car_id: id,
      user_id: "763y4uhwbesdx",
      expected_return_date: dateAdd24Hours,
      start_date: expect.any(Date),
    });
  });

  it("should not be able to crate a new rental is there is another open to the same user", async () => {
    const user_id = "kbjnasdoxzn";

    const { id } = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand 1",
      category_id: "category 1",
    });

    await rentalsRepositoryInMemory.create({
      car_id: id,
      user_id,
      expected_return_date: dateAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: id,
        user_id,
        expected_return_date: dateAdd24Hours,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to crate a new rental is there is another open to the same car", async () => {
    const { id } = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand 1",
      category_id: "category 1",
    });

    await rentalsRepositoryInMemory.create({
      user_id: "123456",
      car_id: id,
      expected_return_date: dateAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "9ihejbds",
        car_id: id,
        expected_return_date: dateAdd24Hours,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    const { id } = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand 1",
      category_id: "category 1",
    });

    await expect(
      createRentalUseCase.execute({
        car_id: id,
        user_id: "ghbnadfsdmo",
        expected_return_date: dayjs().add(12, "hours").toDate(),
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createRentalUseCase.execute({
        car_id: id,
        user_id: "ghbnadfsdmo",
        expected_return_date: dayjs().add(23, "hours").toDate(),
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createRentalUseCase.execute({
        car_id: id,
        user_id: "ghbnadfsdmo",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
