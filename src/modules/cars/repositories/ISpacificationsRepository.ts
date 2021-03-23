import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Specification;
  findByName(name: string): Specification;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
