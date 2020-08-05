import express from "express";

import { DB } from "./src/db";
import config from "./config/mysql.config.json";
import { User } from "./dataModels/user";
import Router from "./routes/router";

const app: express.Application = express();
const db = new DB(config);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


db.connect()
.then(() => {
  app.use(Router);
  app.listen(3333);
  console.log('....................')

  let user = new User();
  
  user.name = "valn";
  user.phone = "13566263333";
    user.address = "中文字符";
    db.save(user, "user");
  })
  .then(() => {
    db.end();
  })
  .catch((err) => {
    console.log(err);
    return;
  });
