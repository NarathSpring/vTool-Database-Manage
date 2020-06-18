import express from "express";
import DB from "./src/db";
import config from "./src/mysql.config.json";

// const config = {
//   host: "localhost",
//   port: 3307,
//   user: "root",
//   password: "123456"
// };

const app = express();

const db = new DB(config);

db.connect();

db.createDatabase("mydatabase");
db.showDatabase("mydatabase");

db.end();

// app.listen(3000, () => {
//   console.log("listening 3000");
// });
