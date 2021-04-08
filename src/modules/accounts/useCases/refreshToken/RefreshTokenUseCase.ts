import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { authConfig } from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUserstokesRepository";
import { IDateProvider } from "@shared/container/Providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { sub: user_id, email } = verify(
      token,
      authConfig.secret_refresh_token
    ) as IPayload;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!userToken) {
      throw new AppError("Refresh token does not exists");
    }

    const refresh_token = sign({ email }, authConfig.secret_refresh_token, {
      subject: user_id,
      expiresIn: authConfig.expires_in_refresh_token,
    });

    await this.usersTokensRepository.create({
      user_id,
      expires_date: this.dateProvider.addDays(
        authConfig.expires_refresh_token_days
      ),
      refresh_token,
    });

    await this.usersTokensRepository.delete(userToken.id);

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
