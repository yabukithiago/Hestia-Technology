import { Context } from "../deps.ts";

export class Index {
  public static get(ctx: Context) {
    ctx.response.type = "json";
    ctx.response.body = { "hello": "world" };
  }
}
