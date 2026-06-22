const path = require("path");
const Database = require("better-sqlite3");

const db = new Database(path.join(__dirname, "products.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    stock INTEGER NOT NULL
  )
`);

const count = db.prepare("SELECT COUNT(*) AS count FROM products").get().count;

if (count === 0) {
  const insert = db.prepare("INSERT INTO products (name, price, stock) VALUES (?, ?, ?)");
  const defaultProducts = [
    ["무선 마우스", 15000, 32],
    ["기계식 키보드", 89000, 8],
    ["27인치 모니터", 250000, 5],
    ["USB-C 허브", 32000, 0],
    ["웹캠", 45000, 12],
  ];
  for (const product of defaultProducts) {
    insert.run(...product);
  }
}

module.exports = db;
