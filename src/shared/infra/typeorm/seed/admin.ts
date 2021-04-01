import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection();

  const id = uuid();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO users(id, name, email, password, driver_license, "isAdmin", created_at, updated_at)
    VALUES('${id}', 'Admin', 'admin@rentx.com.br', '${password}', '000123', true, 'now()', 'now()')
    `
  );

  await connection.close();
}

create()
  .then(() => console.log("User admin created!"))
  .catch((err) => console.error(err))
  .finally(() => console.log("Query finalizada!"));
