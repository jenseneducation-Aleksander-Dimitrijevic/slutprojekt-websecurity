const { Router } = require("express");
const router = new Router();
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("./auth");

// REST OPERATIONS
// Create new resource list orders
router.get("/", auth.auth, async (req, res) => {
  try {
    // Check if role is admin or customer
    if (req.user.role === "admin") {
      // List all orders with admin rights
      const orders = await Order.getOrders();
      res.json(orders);

      // List order(s) for specific user if role type is customer
    } else if (req.user.role === "customer") {
      const order = await Order.getOneOrder(req.user.userID);
      res.json(order);
    }
  } catch (error) {
    // If any errors, catch error and send error message to client
    res.status(401).json({ message: error });
  }
});

// Create resource to create new order(s)
router.post("/", auth.auth, async (req, res) => {
  try {
    // Insert new order(s) into database with corresponding user
    const order = await Order.create(req.body, req.user.userID);
    res.json(order);
  } catch (error) {
    // If any errors, catch error and send error message to client
    res.status(401).json({ message: error });
  }
});

module.exports = router;
