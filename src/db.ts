import mysql from "mysql";

class VTool {
  private connection: mysql.Connection;

  constructor(public config: mysql.ConnectionConfig) {
    this.connection = mysql.createConnection({
      host: this.config.host,
      port: this.config.port,
      user: this.config.user,
      password: this.config.password
    });
  }

  connect() {
    this.connection.connect((err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("连接成功");
    });
  }

  end() {
    this.connection.end((err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("关闭成功");
    });
  }
  query() {}
  add() {}
  remove() {}
  delete() {}
  createDatabase(database_name: string) {
    // CREATE DATABASE IF NOT EXISTS dabase_name
    const q = "CREATE DATABASE IF NOT EXISTS " + database_name;
    this.connection.query(q, (err, results, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("创建数据库成功：");
      console.log(results);
    });
  }
  dropDatabase(database_name: string) {
    // DROP DATABASE database_name
  }
  createTable(table_name: string, content: object) {
    //  CREATE TABLE table_name (content)
  }
  dropTable(table_name: string) {
    // DROP TABLE table_name
  }
  trncateTable(table_name: string) {
    // TRUNCATE TABLE table_name
  }
  showDatabase(database_name: string) {
    const q = `SHOW DATABASES`;
    this.connection.query(q, (err, results, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(results);
    });
  }
  showTable(table_name: string) {}
}

export default VTool;
