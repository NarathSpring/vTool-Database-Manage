import Express from "express";
import { DB } from "../src/db";
import config from "../config/mysql.config.json";
import { User } from "../dataModels/user";

export async function getAll(req: Express.Request, res: Express.Response) {
  const db = new DB(config);
  db.connect()
    .then(async (x) => {
      // let user = new User();
      // user.name = "valentine";
      // user.phone = "13566263333";
      // user.address = "中文字符";
      // db.save(user, "user");
      console.log("x:" + x);

      const users = (await db.findAll("user")) as Array<object>;
      users.map((user: any) => {
        console.log(JSON.stringify(user));
      });
    })
    .then(() => {
      db.end();
    })
    .catch((err) => {
      console.log(err);
      return;
    });
  res.end();
}
