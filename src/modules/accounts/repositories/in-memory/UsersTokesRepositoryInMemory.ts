import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";

import { IUsersTokensRepository } from "../IUserstokesRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersTokens: UserToken[];

  constructor() {
    this.usersTokens = [];
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    return this.usersTokens.find(
      (findUserToken) => findUserToken.refresh_token === refresh_token
    );
  }

  async delete(id: string): Promise<void> {
    const userTokenIndex = this.usersTokens.findIndex(
      (findUserToken) => findUserToken.id === id
    );

    this.usersTokens.splice(userTokenIndex, 1);
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    return this.usersTokens.find(
      (findUserToken) =>
        findUserToken.user_id === user_id &&
        findUserToken.refresh_token === refresh_token
    );
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };
