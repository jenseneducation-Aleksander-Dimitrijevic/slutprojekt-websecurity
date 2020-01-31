const { Router } = require("express");
const router = new Router();

const Order = require("../models/Order");

router.get("/api/orders", async (req, res) => {
  const order = await Order.getOrders();
  res.json(order);
});

router.post("/api/orders", async (req, res) => {
  const order = await Order.create(req.body);
  if (!order) {
    res.json({ message: "Order not found" });
  } else {
    res.json({ message: "Order created" });
  }
});

module.exports = router;
