import mysql from "mysql";

class VTool {
  private _connection: mysql.Connection;
  private _table: string = "";
  private _database: string = "";

  // 待插入的内容
  public content = {};

  constructor(public config: mysql.ConnectionConfig) {
    this._connection = mysql.createConnection({
      host: this.config.host,
      port: this.config.port,
      user: this.config.user,
      password: this.config.password
    });
    // console.log(this.connection)
  }

  connect() {
    this._connection.connect((err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("连接成功");
    });
  }

  end() {
    this._connection.end((err) => {
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
      this._connection.query(q, (err, results, fields) => {
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

  save(object: object, table_name?: string) {
    // let arr: string[] = []
    // for (var i in object) {
    //   if (object.hasOwnProperty(i)) {
    //     arr.push(i)
    //   }
    // }
    console.log(object);

    const q = `INSERT INTO ${table_name} SET ?`;
    this._connection.query(q, object, (err, results, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(results);
    });
  }

  remove() {}

  delete() {}

  useDatabase(database_name: string) {
    this._connection.config.database = database_name;
    this._database = database_name;
    // console.log(this._connection.config.database);
  }

  createTable(table_name: string, columns: string[]) {
    //  CREATE TABLE table_name (content)
    let s: string[] = [];
    columns.map((i) => {
      s.push(i + " VARCHAR(255)");
    });
    const q = `CREATE TABLE IF NOT EXISTS ${table_name} (userId INT AUTO_INCREMENT PRIMARY KEY, ${s}) CHARSET=utf8`;
    console.log(q);

    this._connection.query(q, (err, results, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(results);
    });
  }

  dropTable(table_name: string) {
    // DROP TABLE table_name
    const q = `DROP TABLE ${table_name}`;
    this._connection.query(q, (err, results, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(results);
    });
  }

  trncateTable(table_name: string) {
    // TRUNCATE TABLE table_name
  }
}

export default VTool;
