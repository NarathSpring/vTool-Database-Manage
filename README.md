# 主要功能

- yarn db:create
- yarn db:drop
- connect()
- end()
- save() & createTable()

# 使用

```javascript
import db
import config
import Model

const db = new DB()
db.connect()
  .then(()=>{
    // some code

  })
  .then(() => {
    db.end();

  })
  .catch((err) => {
    console.log(err)

  });
```

# 数据模型

```javascript
// User Model
export class User {
  constructor(
    public name?: string,
    public phone?: string,
    public address?: string
  ) {}
}
```

