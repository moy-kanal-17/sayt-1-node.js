const express = require("express"); //fastify, nest, koa
const mongoose = require("mongoose"); //ODM - Objejt Document Mapping
const config = require("config"); //o'zgaruvchilar muhitidan o'qish
const mainRouter = require("./routes/index.routes");
const cookieParser = require("cookie-parser"); // birnechta ma'lumotlarni abject ko'rinishida chiqazib beradi
//  req.headers.kookiesni || birnechta ma'lumotlarni -> 1-value;2-value ko'rinishida chiqazib beradi
const exHbs = require('express-handlebars');

const errorHandling = require("./middleware/errors/error.handling");
const viewRouter = require("./routes/view.routes")
const PORT = config.get("port") || 3030;

const app = express();
app.use(cookieParser()); // req.cookies
app.use(express.json()); // parse body

const hbs = exHbs.create({
  defaultLayout:"main",
  extname:"hbs"
})
app.engine("hbs",hbs.engine)
app.set("View engine","hbs")
app.set("views", "views");
app.use(express.static("views"))


app.use("/", viewRouter); //FRONTEND 
app.use("/api", mainRouter); //BACKEND

app.use(errorHandling); // doim eng oxiriga yozaman

async function start() {
  try {
    await mongoose.connect(config.get("dbUri"));
    app.listen(PORT, () => {
      console.log(`Server is started at http://localhost${PORT}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Ma'lumotlar bazasig ulanishda xatolik");
  }
}

start();



