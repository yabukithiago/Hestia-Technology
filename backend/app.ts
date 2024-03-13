import { Application, Context, isHttpError, Next, Router } from "./deps.ts";
import { Index } from "./routes/index.ts";

const app = new Application();
const router = new Router();

app.use(async (ctx: Context, next: Next) => {
  try {
    await next();
    if (ctx.response.status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    if (isHttpError(err)) ctx.response.status = err.status;
    else ctx.response.status = 500;
    ctx.response.body = { error: err.message };
    ctx.response.type = "json";
  }
});

router
  .get("/", Index.get)
  .get("/other", (ctx) => ctx.throw(415));

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
