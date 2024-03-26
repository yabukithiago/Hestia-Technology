import { Pool } from "../deps.ts";

export const DBPool = new Pool(
  {
    database: "gesconsultoria",
    hostname: "hostname",
    password: "password",
    port: 5432,
    user: "user",
  },
  20,
);
