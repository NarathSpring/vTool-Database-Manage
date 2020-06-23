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
    // console.log(this.connection)
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

  show(database_name: string, table_name?: string) {
    if (arguments.length === 1) {
      const q = "SHOW DATABASES";
      this.connection.query(q, (err, results, fields) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(results);
      });
    } else {
      const q = `SHOW ${table_name} FROM ${database_name}`;
    }
  }

  add() {}

  remove() {}

  delete() {}

  useDatabase(database_name: string) {
    this.connection.config.database = database_name;
    console.log(this.connection.config.database);
  }
  createDatabase(database_name: string) {
    // CREATE DATABASE IF NOT EXISTS dabase_name
    const q = `CREATE DATABASE ${database_name}`;
    this.connection.query(q, (err, results, fields) => {
      if (err) {
        switch (err.errno) {
          case 1007:
            console.log("数据库已经存在");
            break;
          default:
            console.log(err.code + ": " + err.errno);
            break;
        }
        return;
      }
      console.log("创建数据库成功：");
      // console.log(results);
    });
  }

  dropDatabase(database_name: string) {
    // DROP DATABASE database_name
  }

  createTable(table_name: string, columns: string[]) {
    //  CREATE TABLE table_name (content)
    // const q = `CREATE TABLE IF NOT EXISTS ${content}`
    let s: string[] = [];
    columns.map((i) => {
      s.push(i + " VARCHAR(255)");
    });
    const q = `CREATE TABLE IF NOT EXISTS ${table_name} (userId INT AUTO_INCREMENT PRIMARY KEY, ${s})`;
    console.log(q);

    // this.connection.query(q, (err, results, fields) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   console.log(results);
    // });
  }

  dropTable(table_name: string) {
    // DROP TABLE table_name
  }

  trncateTable(table_name: string) {
    // TRUNCATE TABLE table_name
  }
}

export default VTool;
