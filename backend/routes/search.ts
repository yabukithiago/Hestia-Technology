import { Context } from "../deps.ts";
//import { Client } from "../deps.ts";

export class Search {
  public static get(ctx: Context) {
    // Get the body of the request
    const input = ctx.request.url.searchParams.get("input");
    if (!input) {
      ctx.throw(400, "Param input is required");
    }

    ctx.response.type = "json";
    ctx.response.body = { "hello": "world" };
  }
}
