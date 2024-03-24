import { Application, Context, isHttpError, Next, Router } from "./deps.ts";
import { Index } from "./routes/index.ts";
import { login, register } from "./routes/auth.ts";

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

//#region Login and Register
const usernameInput = prompt("Digite seu nome de usuário:");
const passwordInput = prompt("Digite sua senha:");

if (usernameInput !== null && passwordInput !== null) {
  const username = usernameInput as string;
  const password = passwordInput as string;

  if (login(username, password)) {
    console.log("Login bem-sucedido!");
  } else {
    console.log("Login falhou. Verifique seu nome de usuário e senha.");
  }
} else {
  console.log("Entrada inválida. Nome de usuário e/ou senha não fornecidos.");
}

const newUserInput = prompt("Digite seu novo nome de usuário:");
const newPasswordInput = prompt("Digite sua nova senha:");

if (newUserInput !== null && newPasswordInput !== null) {
  const newUser = newUserInput as string;
  const newPassword = newPasswordInput as string;

  if (register(newUser, newPassword)) {
    console.log("Registro bem-sucedido!");
  } else {
    console.log("Registro falhou. Nome de usuário já existe.");
  }
} else {
  console.log("Entrada inválida. Nome de usuário e/ou senha não fornecidos.");
}
//#endregion
