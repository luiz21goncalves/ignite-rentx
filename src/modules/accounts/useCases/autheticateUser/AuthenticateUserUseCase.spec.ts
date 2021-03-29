import { AppError } from "../../../../errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryImMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
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
