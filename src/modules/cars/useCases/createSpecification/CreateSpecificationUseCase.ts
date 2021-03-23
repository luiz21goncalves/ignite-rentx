import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpacificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): Specification {
    const specificationAlreadyExists = this.specificationRepository.findByName(
      name
    );

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists.");
    }

    const specification = this.specificationRepository.create({
      name,
      description,
    });

    return specification;
  }
}

export { CreateSpecificationUseCase };
