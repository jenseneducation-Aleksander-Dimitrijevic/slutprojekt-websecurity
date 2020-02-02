const { Router } = require("express");
const router = new Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

router.post("/api/register", async (req, res) => {
  const user = await User.register(req.body);
  if (user) {
    res.json(user);
  } else {
    res.status(302).send("Something went wrong");
  }
});

router.post("/api/auth", async (req, res) => {
  const authUser = await User.auth(req.body);
  const token = jwt.verify(authUser, secret);
  if (token) res.json(token);
  else res.json({ error: "Couldn't log you in" });
});

module.exports = router;
