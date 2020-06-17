declare namespace v {
  interface MysqlConfigObject {
    host: string;
    port?: number;
    user: string;
    password: string;
  }
}

export = v