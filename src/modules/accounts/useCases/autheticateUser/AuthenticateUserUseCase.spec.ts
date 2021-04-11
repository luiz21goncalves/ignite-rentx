import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryImMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokesRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/Providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dayjsDateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayjsDateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const data = {
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
      driver_license: "09123841234",
    };

    await createUserUseCase.execute(data);

    const result = await authenticateUserUseCase.execute({
      email: data.email,
      password: data.password,
    });

    expect(result).toMatchObject({
      token: expect.any(String),
      user: {
        name: data.name,
        email: data.email,
      },
    });
  });

  it("should be able to authenticate nonexistent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "non.existring@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to authenticate with incorrect password", async () => {
    const data = {
      name: "John Doe",
      email: "johndoe@email.com",
      password: "123456",
      driver_license: "09123841234",
    };

    await createUserUseCase.execute(data);

    await expect(
      authenticateUserUseCase.execute({
        email: data.name,
        password: "incorrect-password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
