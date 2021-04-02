import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/Providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dateAdd24Hours = dayjs().add(24, "hours").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("should be able to create new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "dfghjklastyu",
      user_id: "763y4uhwbesdx",
      expected_return_date: dateAdd24Hours,
    });

    expect(rental).toMatchObject({
      id: expect.any(String),
      car_id: "dfghjklastyu",
      user_id: "763y4uhwbesdx",
      expected_return_date: dateAdd24Hours,
      start_date: expect.any(Date),
    });
  });

  it("should not be able to crate a new rental is there is another open to the same user", async () => {
    const user_id = "kbjnasdoxzn";

    await rentalsRepositoryInMemory.create({
      car_id: "123456",
      user_id,
      expected_return_date: dateAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "9ihejbds",
        user_id,
        expected_return_date: dateAdd24Hours,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to crate a new rental is there is another open to the same car", async () => {
    const car_id = "kbjnasdoxzn";

    await rentalsRepositoryInMemory.create({
      user_id: "123456",
      car_id,
      expected_return_date: dateAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "9ihejbds",
        car_id,
        expected_return_date: dateAdd24Hours,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "yughjbsd",
        user_id: "ghbnadfsdmo",
        expected_return_date: dayjs().add(12, "hours").toDate(),
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createRentalUseCase.execute({
        car_id: "yughjbsd",
        user_id: "ghbnadfsdmo",
        expected_return_date: dayjs().add(23, "hours").toDate(),
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createRentalUseCase.execute({
        car_id: "yughjbsd",
        user_id: "ghbnadfsdmo",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
