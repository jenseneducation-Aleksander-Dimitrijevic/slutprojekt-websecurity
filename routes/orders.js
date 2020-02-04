const { Router } = require("express");
const router = new Router();
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/api/orders", async (req, res) => {
  if (req.headers.authorization === undefined) {
    res.status(403).json({ message: "You are not allowed" });
  } else {
    try {
      const user = jwt.verify(
        req.headers.authorization.replace("Bearer ", ""),
        process.env.SECRET
      );
      if (user.role == "admin") {
        const orders = await Order.getOrders();
        res.json(orders);
      } else if (user.role == "customer") {
        const order = await Order.getOneOrder();
        res.json(order);
      }
    } catch (error) {
      res.status(403).json({ message: error });
    }
  }
});

router.post("/api/orders", async (req, res) => {
  if (req.headers.authorization === undefined) {
    res.status(403).json({ message: "You are not allowed" });
  } else {
    try {
      const user = jwt.verify(
        req.headers.authorization.replace("Bearer ", ""),
        process.env.SECRET
      );
      const order = await Order.create(req.body, user.userID);
      res.json(order);
    } catch (error) {
      res.status(403).json({ message: error });
    }
  }
});

module.exports = router;
