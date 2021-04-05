import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/Providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(id: string): Promise<Rental> {
    const MINIMUM_DAILY = 1;

    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError("Rental does not exists");
    }

    const car = await this.carsRepository.findById(rental.car_id);

    if (!car) {
      throw new AppError("Car does not exists");
    }

    await this.carsRepository.updatedAvailable({
      id: rental.car_id,
      available: true,
    });

    let daily = this.dateProvider.compareInDays({
      start_date: rental.start_date,
      end_date: new Date(),
    });

    if (daily > 0) {
      daily = MINIMUM_DAILY;
    }

    const delay = this.dateProvider.compareInDays({
      start_date: new Date(),
      end_date: rental.expected_return_date,
    });

    let total = 0;

    if (delay > 0) {
      total = delay * car.fine_amount;
    }

    total += car.daily_rate * daily;

    Object.assign(rental, {
      end_date: new Date(),
      total,
    });

    await this.rentalsRepository.update(rental);

    await this.carsRepository.updatedAvailable({
      id: car.id,
      available: true,
    });

    return rental;
  }
}

export { DevolutionRentalUseCase };
