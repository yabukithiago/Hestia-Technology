import { Pool } from "../deps.ts";

export function ConnectDBPool() {
  const POOL_CONNECTIONS = 20;
  const dbPool = new Pool(
    {
      database: "gesconsultoria",
      hostname: "hostname",
      password: "password",
      port: 5432,
      user: "user",
    },
    POOL_CONNECTIONS,
  );

  return dbPool;
}
