import "reflect-metadata";
import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";
import { routes } from "@shared/infra/http/routes";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";

import "@shared/container";

createConnection();
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

export { app };
