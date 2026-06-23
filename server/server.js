const path = require("path");
const express = require("express");
const db = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

app.get("/api/products", (req, res) => {
  const products = db.prepare("SELECT * FROM products ORDER BY id").all();
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const { name, price, stock } = req.body;
  const insert = db.prepare("INSERT INTO products (name, price, stock) VALUES (?, ?, ?)");
  const result = insert.run(name, price, stock);
  const newProduct = db.prepare("SELECT * FROM products WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  db.prepare("UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?").run(name, price, stock, id);
  const updatedProduct = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
  res.json(updatedProduct);
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  db.prepare("DELETE FROM products WHERE id = ?").run(id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
