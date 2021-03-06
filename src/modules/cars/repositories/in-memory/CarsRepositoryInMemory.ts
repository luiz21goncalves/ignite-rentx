import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListCarsDTO } from "@modules/cars/dtos/IListCarsDTO";
import { IUpdatedAvailableDTO } from "@modules/cars/dtos/IUpdateAvailableDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  constructor() {
    this.cars = [];
  }

  async updatedAvailable({
    id,
    available,
  }: IUpdatedAvailableDTO): Promise<void> {
    const carIndex = this.cars.findIndex((findIndex) => findIndex.id === id);

    this.cars[carIndex].available = available;
  }

  async save(car: Car): Promise<Car> {
    const carIndex = this.cars.findIndex((findCar) => findCar.id === car.id);

    this.cars[carIndex] = car;

    return car;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((findCar) => findCar.id === id);
  }

  async listAllAvailable({
    name,
    brand,
    category_id,
  }: IListCarsDTO): Promise<Car[]> {
    let availabeCars = this.cars.filter((car) => car.available === true);

    if (name) {
      availabeCars = availabeCars.filter((car) => car.name === name);
    }

    if (brand) {
      availabeCars = availabeCars.filter((car) => car.brand === brand);
    }

    if (category_id) {
      availabeCars = availabeCars.filter(
        (car) => car.category_id === category_id
      );
    }

    return availabeCars;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((findCar) => findCar.license_plate === license_plate);
  }

  async create({
    name,
    description,
    license_plate,
    daily_rate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      license_plate,
      daily_rate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);

    return car;
  }
}

export { CarsRepositoryInMemory };
