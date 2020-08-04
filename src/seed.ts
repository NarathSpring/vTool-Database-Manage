import DB from "./db";
import config from "../config/mysql.config.json";
import { User } from "../DataModels/user";

const db = new DB(config);

db.connect()
  .then(() => {
    let user = new User();
    user.name = "valen";
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
