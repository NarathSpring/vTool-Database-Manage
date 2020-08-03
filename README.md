### 创建数据库
- connect() 

- end() 

- query() {}

- add() {}

- remove() {}

- delete() {}

- createDatabase(database_name: string) 

- dropDatabase(database_name: string) 

- createTable(table_name: string, content: object) 
  自动创建带有id的自增长主键
  CREATE TABLE IF NOT EXISTS (column1 type, column2 type, ...)
  ['name VARCHAR(255)']

- dropTable(table_name: string) 

- trncateTable(table_name: string)

- showDatabase(database_name: string)

- showTable(table_name: string)


## 增：

- 构造数据对象：user



填写配置文件

创建数据模型

import db & import config & import Model

```javascript
const db = new DB()
db.connect()
// 其他操作
```