const Koa = require("koa");
const serve = require("koa-static");
const views = require("koa-views");
const mongoose = require("mongoose");
const routes = require("./routes");
const { MLAB_URI } = process.env;

mongoose.connect(MLAB_URI);
mongoose.Promise = global.Promise;

const app = new Koa();

app.use(views(__dirname + "/views", { extension: "pug" }));
app.use(serve(__dirname + "/public"));
app.use(routes);

app.listen(process.env.PORT || 3000);
