import mysql, { MysqlError, QueryFunction, queryCallback } from "mysql";

export class DB {
  private _connection: mysql.Connection;
  public _table: string = "user";
  public _database: string = "";

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
        if (err) reject(err);
        console.log("连接成功");
        resolve();
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

  remove() {}

  async useDatabase(database_name: string) {
    this._connection.config.database = database_name;
    this._database = database_name;
  }

  async useTable(table_name: string) {
    this._table = table_name;
  }

  async createTable(table_name: string, columns: string[]) {
    //  CREATE TABLE table_name (content)
    let s: string[] = [];
    columns.map((i) => {
      s.push(i + " VARCHAR(255)");
    });

    this._connection.query(
      {
        sql: `CREATE TABLE IF NOT EXISTS ${table_name} (id INT AUTO_INCREMENT PRIMARY KEY, ${s}) CHARSET=utf8`
      },
      (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("建表成功");
        this._table = table_name;
      }
    );
  }

  findOne(...arg) {
    return new Promise((resolve, reject) => {
      if (arg.length === 1 && typeof arg[0] === "number") {
        this._connection.query(
          {
            sql: `SELECT * FROM ${this._table} WHERE id = ${arg[0]}`
          },
          (err, results) => {
            if (err) reject(err);
            resolve(results);
          }
        );
      } else {
        this._connection.query(
          {
            sql: `SELECT * FROM ${this._table} WHERE ${arg[0]} = ?`,
            values: arg[1].toString()
          },
          (err, results) => {
            if (err) reject(err);
            resolve(results);
          }
        );
      }
    });
  }

  findAll() {
    // SELECT * FROM table
    return new Promise((resolve, reject) => {
      this._connection.query(
        {
          sql: `SELECT * FROM ${this._table}`
        },
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  dropTable(table_name: string) {
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
