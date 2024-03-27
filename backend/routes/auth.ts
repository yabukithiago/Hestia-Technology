import { DBPool } from "../utils/db.ts";

const db = await DBPool.connect();

interface User {
  username: string;
  password: string;
}

export async function login(
  username: string,
  password: string,
): Promise<boolean> {
  const result = await db.queryObject<User>(
    `SELECT * FROM users WHERE username = $1 AND password = $2`,
    [username, password],
  );

  return result.rows.length > 0;
}

export async function register(
  username: string,
  password: string,
): Promise<boolean> {
  try {
    await db.queryObject(
      `INSERT INTO users (username, password) VALUES ($1, $2)`,
      [username, password],
    );
    return true;
    // deno-lint-ignore no-unused-vars
  } catch (error) {
    // se der erro, o user ja existe
    return false;
  }
}
