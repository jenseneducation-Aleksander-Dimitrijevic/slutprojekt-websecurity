const { Router } = require("express");
const router = new Router();

const Product = require("../models/Product");

router.get("/api/products", async (req, res) => {
  const products = await Product.all();
  res.json(products);
});

router.get("/api/products/:id", async (req, res) => {
  const product = await Product.getOne(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.json({ message: "Product not found" });
  }
});

router.post("/api/products", async (req, res) => {
  const product = await Product.create(req.body);
  if (product) {
    res.json(product);
  } else {
    res.json({ message: "Product couldn't be created" });
  }
});

router.delete("/api/products/:id", async (req, res) => {
  const product = await Product.delete(req.params.id);
  if (product) {
    res.json({ message: "Item deleted" });
  } else {
    res.json({ message: "Couldn't delete product" });
  }
});

router.patch("/api/products/:id", async (req, res) => {
  const product = await Product.update(req.params.id, req.body);
  if (product) {
    res.json({ message: "Item updated" });
  } else {
    res.json({ message: "Couldn't update product" });
  }
});

module.exports = router;
