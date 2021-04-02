import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IListCarsDTO } from "../dtos/IListCarsDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  save(car: Car): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findById(id: string): Promise<Car>;
  listAllAvailable(data: IListCarsDTO): Promise<Car[]>;
}

export { ICarsRepository };
