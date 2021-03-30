import { resolve } from "path";
import { inject, injectable } from "tsyringe";

import { User } from "@modules/accounts/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { deleteFile } from "@utils/file";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ user_id, avatar_file }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      const filePath = resolve(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "..",
        "tmp",
        "avatar",
        user.avatar
      );

      await deleteFile(filePath);
    }

    Object.assign(user, { avatar: avatar_file });

    await this.usersRepository.save(user);

    return user;
  }
}

export { UpdateUserAvatarUseCase };
