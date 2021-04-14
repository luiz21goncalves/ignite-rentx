import { Request, Response } from "express";
import { container } from "tsyringe";

import { UserMap } from "@modules/accounts/mapper/UserMap";

import { ShowUserProfileUseCase } from "./ShowProfileUseCase";

class ShowUserProfileCotroller {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showUserProfileUseCase = container.resolve(ShowUserProfileUseCase);

    const user = await showUserProfileUseCase.execute(id);

    return response.json(UserMap.toDTO(user));
  }
}

export { ShowUserProfileCotroller };
