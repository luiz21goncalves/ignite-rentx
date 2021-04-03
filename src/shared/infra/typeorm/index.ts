import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "localhost"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  Object.assign(defaultOptions, {
    host,
  });

  if (process.env.NODE_ENV === "test") {
    Object.assign(defaultOptions, {
      database: "rentx_test",
    });
  }

  return createConnection(defaultOptions);
};
