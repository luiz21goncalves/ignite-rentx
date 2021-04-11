import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
let token: string;
let categoriesRepository: CategoriesRepository;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
  });

  beforeEach(async () => {
    await connection.runMigrations();

    const password = await hash("admin", 8);

    connection.query(
      `INSERT INTO users(id, name, email, password, driver_license, "isAdmin", created_at, updated_at)
        VALUES('${uuid()}', 'Admin', 'admin@rentx.com.br', '${password}', '000123', true, 'now()', 'now()')
        `
    );

    const { body } = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    token = body.refresh_token;

    categoriesRepository = new CategoriesRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  afterEach(async () => {
    await connection.dropDatabase();
  });

  it("should be able to create new category", async () => {
    const { body, status } = await request(app)
      .post("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: "Category Supertest",
        description: "Description category supertest",
      });

    expect(status).toEqual(201);
    expect(body).toMatchObject({
      id: expect.any(String),
      name: "Category Supertest",
      description: "Description category supertest",
    });
  });

  it("should not be able to create a new category with name exists", async () => {
    await categoriesRepository.create({
      name: "Category Supertest",
      description: "Description category supertest",
    });

    const { body, status } = await request(app)
      .post("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: "Category Supertest",
        description: "Description category supertest",
      });

    expect(status).toEqual(400);
    expect(body).toMatchObject({
      statusCode: 400,
      status: "error",
      error: expect.any(String),
    });
  });
});
