const { Router } = require("express");
const router = new Router();

const Product = require("../models/Product");

router.get("/api/products", async (req, res) => {
  const products = await Product.all();
  res.json(products);
});

module.exports = router;
