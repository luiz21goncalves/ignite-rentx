import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { authConfig } from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUserstokesRepository";
import { IDateProvider } from "@shared/container/Providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IUser {
  name: string;
  email: string;
}

interface IResponse {
  user: IUser;
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UsersTokesRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const {
      expires_in_refresh_token,
      expires_in_token,
      secret_refresh_token,
      secret_token,
      expires_refresh_token_days,
    } = authConfig;
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    await this.usersTokensRepository.create({
      user_id: user.id,
      expires_date: this.dateProvider.addDays(expires_refresh_token_days),
      refresh_token,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token,
    };
  }
}

export { AuthenticateUserUseCase };
