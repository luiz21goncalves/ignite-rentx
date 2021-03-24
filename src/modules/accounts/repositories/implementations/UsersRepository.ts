import { getRepository, Repository } from "typeorm";

import { User } from "../../entities/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    username,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      username,
      email,
      password,
      driver_license,
    });

    await this.repository.save(user);

    return user;
  }
}

export { UsersRepository };
