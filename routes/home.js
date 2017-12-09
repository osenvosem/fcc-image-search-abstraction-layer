const Router = require("koa-router");
const router = new Router();

router.get("/", async (ctx, next) => {
  await ctx.render("home", { host: `${ctx.protocol}://${ctx.host}` });
  await next();
});

module.exports = router;
