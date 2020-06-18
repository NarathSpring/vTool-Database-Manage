import DB from './db'
import config from './mysql.config.json'

const db = new DB(config)
const content = ['name VARCHAR(255)']


db.connect()
db.createDatabase('test_database')
db.createTable('test_table', content)