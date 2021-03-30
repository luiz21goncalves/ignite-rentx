import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";
import { routes } from "@shared/infra/http/routes";

import swaggerFile from "../../../swagger.json";

import "@shared/infra/typeorm";
import "@shared/container";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.use(
  (err: Error, resquest: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        error: err.message,
        statusCode: err.statusCode,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
      statusCode: 500,
    });
  }
);

app.listen(3333, () => console.log("Server is running!"));
