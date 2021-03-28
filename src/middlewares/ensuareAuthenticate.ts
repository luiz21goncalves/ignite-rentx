import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

async function ensuareAutheticate(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing");
  }

  const [bearer, token] = authHeader.split(" ");

  if (!bearer || !token) {
    throw new AppError("Token badly formatteds", 401);
  }

  try {
    const { sub: user_id } = verify(
      token,
      "84a7bfa74967c74819208acb9934e458"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    next();
  } catch (err) {
    throw new AppError("Invalid token", 401);
  }
}

export { ensuareAutheticate };
