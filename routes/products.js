const { Router } = require("express");
const router = new Router();

const Product = require("../models/Product");
const auth = require("./auth");

// REST OPERATIONS
// List all products
router.get("/", async (req, res) => {
  const products = await Product.all();
  res.json(products);
});

// List specific product
router.get("/:id", async (req, res) => {
  const product = await Product.getOne(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.json({ message: "Product not found" });
  }
});

// Create new product
router.post("/", auth.auth, async (req, res) => {
  if (req.user.role == "admin") {
    const product = await Product.create(req.body);
    if (product) {
      res.json(product);
    } else {
      res.json({ message: "Product couldn't be created" });
    }
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
});

// Delete specific product
router.delete("/:id", auth.auth, async (req, res) => {
  if (req.user.role == "admin") {
    const product = await Product.delete(req.params.id);
    if (product) {
      res.json({ message: "Item deleted" });
    } else {
      res.json({ message: "Couldn't delete product" });
    }
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
});

// Update specific product
router.patch("/:id", auth.auth, async (req, res) => {
  if (req.user.role == "admin") {
    const product = await Product.update(req.params.id, req.body);
    if (product) {
      res.json({ message: "Item updated" });
    } else {
      res.json({ message: "Couldn't update product" });
    }
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
});

module.exports = router;
