import { classToClass } from "class-transformer";

import { IUserResponse } from "../dtos/IUserResposeDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    id,
    name,
    email,
    driver_license,
    avatar,
    getAvatarUrl,
  }: User): IUserResponse {
    const user = classToClass({
      id,
      name,
      email,
      driver_license,
      avatar,
      getAvatarUrl,
    });

    return user;
  }
}

export { UserMap };
