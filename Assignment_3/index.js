const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect();

const app = express();

app.use(cors());

app.get("/getProductsByCategory", (req, res) => {
  const query = `
    SELECT Category.name AS category, Product.name, Product.price
    FROM Product
    INNER JOIN Relationship ON Product.id = Relationship.prodId
    INNER JOIN Category ON Category.id = Relationship.categoryId
    GROUP BY Category.name, Product.name, Product.price`;

  connection.query(query, (err, rows) => {
    if (err) {
      console.error("Error retrieving products by category:", err);
      res.status(500).json({ message: "Error fetching products" });
      return;
    }

    const groupedProducts = {};

    for (const row of rows) {
      const category = row.category;
      const productName = row.name;
      const price = row.price;

      if (!groupedProducts[category]) {
        groupedProducts[category] = [];
      }

      groupedProducts[category].push({ name: productName, price: price });
    }

    res.json(groupedProducts);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
