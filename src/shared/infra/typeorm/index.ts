import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  if (process.env.NODE_ENV === "test") {
    Object.assign(defaultOptions, {
      database: "rentx_test",
    });
  }

  return createConnection(defaultOptions);
};
