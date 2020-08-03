import config from "../config/mysql.config.json";
import mysql from "mysql";

const con = mysql.createConnection({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  charset: config.charset
});

con.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("连接成功");
});

const q = `DROP DATABASE ${config.database}`;

con.query(q, (err, results, fields) => {
  if (err) {
    const error = {
      code: err.code,
      errno: err.errno,
      sqlMessage: err.sqlMessage,
      sql: err.sql
    };
    console.log("error: " + JSON.stringify(error));
    return;
  }
  console.log("删除数据库成功: " + config.database);
});

con.end((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("关闭成功");
});
