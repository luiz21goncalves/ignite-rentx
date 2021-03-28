import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

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
    throw new Error("Token missing");
  }

  const [bearer, token] = authHeader.split(" ");

  if (!bearer || !token) {
    throw new Error("Token badly formatteds");
  }

  try {
    const { sub: user_id } = verify(
      token,
      "84a7bfa74967c74819208acb9934e458"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User does not exists");
    }

    next();
  } catch (err) {
    throw new Error("Invalid token");
  }
}

export { ensuareAutheticate };
