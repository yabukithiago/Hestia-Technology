import { Context } from "../deps.ts";
import { DBPool } from "../utils/db.ts";

export class Search {
  public static async get(ctx: Context) {
    // Get the body of the request
    const input = ctx.request.url.searchParams.get("input");
    if (!input) {
      ctx.throw(400, "Param input is required");
    }

    const db = await DBPool.connect();
    const { rows: projectRows } = await db.queryObject<
      { name: string; eid: string }
    >(
      "SELECT name, eid FROM gesconsultoria.project WHERE input LIKE %$1%",
      [
        `%${input}%`,
      ],
    );

    ctx.response.type = "json";
    ctx.response.body = { projects: projectRows };
  }
}
