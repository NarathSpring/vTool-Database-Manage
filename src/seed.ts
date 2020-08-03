import DB from "./db";
import config from "../config/mysql.config.json";
import User from "./user";

const db = new DB(config);
const table_columns = ["name", "phone", "address"];

db.connect();

db.useDatabase("test");
// db.createTable("test_table", table_columns);
// db.dropTable("test_table");

let user = new User();
user.name = "valen";
user.phone = "13566263333";
user.address = "中文字符";
db.save(user, "test_table");

// db.show("test_database", "test_table");

db.end();
