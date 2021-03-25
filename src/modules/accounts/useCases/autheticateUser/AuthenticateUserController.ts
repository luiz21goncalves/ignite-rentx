import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    try {
      const { token, user } = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return response.json({ token, user });
    } catch (err) {
      return response.status(400).json({
        error: err.message,
      });
    }
  }
}

export { AuthenticateUserController };
