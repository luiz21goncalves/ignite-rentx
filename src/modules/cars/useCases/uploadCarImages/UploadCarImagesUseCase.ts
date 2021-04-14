import { inject, injectable } from "tsyringe";

import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IStorageProvider } from "@shared/container/Providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<CarImage[]> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError("Car isn't exists");
    }

    const carImages = await Promise.all(
      images_name.map(async (image_name) => {
        await this.storageProvider.save(image_name, "cars");

        return this.carsImagesRepository.create({
          car_id,
          image_name,
        });
      })
    );

    return carImages;
  }
}

export { UploadCarImagesUseCase };
