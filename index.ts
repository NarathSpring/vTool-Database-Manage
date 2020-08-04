import express from "express";

import { DB } from "./src/db";
import config from "./config/mysql.config.json";
import { User } from "./dataModels/user";
import { AppRoutes } from "./routes/route";

const app: express.Application = express();
const db = new DB(config);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app["get"](
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req);
    res.end();
    next();
  }
);

app.listen(3333);

// db.connect()
//   .then(() => {
//     let user = new User();
//     user.name = "valen";
//     user.phone = "13566263333";
//     user.address = "中文字符";
//     db.save(user, "user");
//   })
//   .then(() => {
//     db.end();
//   })
//   .catch((err) => {
//     console.log(err);
//     return;
//   });
