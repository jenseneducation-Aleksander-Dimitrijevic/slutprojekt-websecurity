const { Router } = require("express");
const router = new Router();
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// REST OPERATIONS
// Create new resource list orders
router.get("/api/orders", async (req, res) => {
  // Check if user is authorized
  if (req.headers.authorization === undefined) {
    res.status(401).json({ message: "You are not allowed" });
  } else {
    try {
      // Verify JWT
      const user = jwt.verify(
        req.headers.authorization.replace("Bearer ", ""),
        process.env.SECRET
      );

      // Check if role is admin or customer
      if (user.role == "admin") {
        // List all orders with admin rights
        const orders = await Order.getOrders();
        res.json(orders);

        // List order(s) for specific user if role type is customer
      } else if (user.role == "customer") {
        const order = await Order.getOneOrder(user.userID);
        res.json(order);
      }
    } catch (error) {
      // If any errors, catch error and send error message to client
      res.status(401).json({ message: error });
    }
  }
});

// Create resource to create new order(s)
router.post("/api/orders", async (req, res) => {
  // Check if user is authorized
  if (req.headers.authorization === undefined) {
    // Send error message to client if user isn't authorized
    res.status(401).json({ message: "You are not allowed" });
  } else {
    try {
      // Verify JWT from client
      const user = jwt.verify(
        req.headers.authorization.replace("Bearer ", ""),
        process.env.SECRET
      );

      // Insert new order(s) into database with corresponding user
      const order = await Order.create(req.body, user.userID);
      res.json(order);
    } catch (error) {
      // If any errors, catch error and send error message to client
      res.status(401).json({ message: error });
    }
  }
});

module.exports = router;
