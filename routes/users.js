const { Router } = require("express");
const router = new Router();
const User = require("../models/User");
require("dotenv").config();

// REST OPERATIONS
// create resource to register user during sign up
router.post("/api/register", async (req, res) => {
  const user = await User.register(req.body);
  if (user) {
    res.json(user);
  } else {
    res.status(302).json({ message: "Something went wrong" });
  }
});

// create resource to authenticate user during login
router.post("/api/auth", async (req, res) => {
  const token = await User.auth(req.body);
  if (token) {
    res.status(201).json(token);
    console.log(token);
  } else res.status(401).json({ error: "You are not authorized" });
});

module.exports = router;
