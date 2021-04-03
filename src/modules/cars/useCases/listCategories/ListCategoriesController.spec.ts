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

    token = body.token;

    categoriesRepository = new CategoriesRepository();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  afterEach(async () => {
    await connection.dropDatabase();
  });

  it("should be able to list all categories", async () => {
    await categoriesRepository.create({
      name: "Category 1",
      description: "Description category 1",
    });
    await categoriesRepository.create({
      name: "Category 2",
      description: "Description category 2",
    });
    await categoriesRepository.create({
      name: "Category 3",
      description: "Description category 3",
    });

    const { body, status } = await request(app)
      .get("/categories")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(status).toEqual(200);
    expect(body).toHaveLength(3);
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: "Category 1",
          description: "Description category 1",
        }),
        expect.objectContaining({
          id: expect.any(String),
          name: "Category 2",
          description: "Description category 2",
        }),
        expect.objectContaining({
          id: expect.any(String),
          name: "Category 3",
          description: "Description category 3",
        }),
      ])
    );
  });
});
