import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListCarsDTO } from "@modules/cars/dtos/IListCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async listAllAvailable({
    brand,
    name,
    category_id,
  }: IListCarsDTO): Promise<Car[]> {
    const carQuery = this.repository
      .createQueryBuilder("car")
      .where("car.available = :available", { available: true });

    if (name) {
      carQuery.andWhere("car.name = :name", { name });
    }

    if (brand) {
      carQuery.andWhere("car.brand = :brand", { brand });
    }

    if (category_id) {
      carQuery.andWhere("car.category_id = :category_id", { category_id });
    }

    const cars = await carQuery.getMany();

    return cars;
  }

  async create({
    name,
    description,
    license_plate,
    brand,
    fine_amount,
    daily_rate,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      license_plate,
      brand,
      fine_amount,
      daily_rate,
      category_id,
      available: true,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: { license_plate },
    });

    return car;
  }
}

export { CarsRepository };
