import mysql from "mysql";

export class DB {
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
      password: this.config.password,
      database: this.config.database,
      charset: this.config.charset
    });
  }

  connect() {
    return new Promise((resolve, reject) => {
      this._connection.connect((err) => {
        if (err) return new Error("err");
        console.log("连接成功");
        resolve(12);
      });
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

  async save(data_model: object, table_name: string) {
    const columns = Object.keys(data_model);
    await this.createTable(table_name, columns);

    const q = `INSERT INTO ${table_name} SET ?`;
    this._connection.query(q, data_model, (err, results, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("保存data成功");
    });
  }

  async remove() {}

  useDatabase(database_name: string) {
    this._connection.config.database = database_name;
    this._database = database_name;
    // console.log(this._connection.config.database);
  }

  async createTable(table_name: string, columns: string[]) {
    //  CREATE TABLE table_name (content)
    let s: string[] = [];
    columns.map((i) => {
      s.push(i + " VARCHAR(255)");
    });

    const q = `CREATE TABLE IF NOT EXISTS ${table_name} (id INT AUTO_INCREMENT PRIMARY KEY, ${s}) CHARSET=utf8`;
    this._connection.query(q, (err, results, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("建表成功");
    });
  }

  async find() {}
  
  findAll(table_name: string) {
    // SELECT * FROM table
    return new Promise((resolve, reject) => {
      const q = `SELECT * FROM ${table_name}`;
      this._connection.query(q, (err, results, fields) => {
        if (err) {
          console.log(err);
          return;
        }
        resolve(results);
      });
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
}
