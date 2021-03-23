import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    try {
      const createSpecificationUseCate = container.resolve(
        CreateSpecificationUseCase
      );

      const specification = createSpecificationUseCate.execute({
        name,
        description,
      });

      return response.status(201).json(specification);
    } catch (err) {
      return response.status(400).json({
        error: err.message,
      });
    }
  }
}

export { CreateSpecificationController };
