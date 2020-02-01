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
    res.send("Something went wrong yao...");
  }
});

router.post("/api/auth", async (req, res) => {
  const token = await User.login(req.body);
  const verify = jwt.verify(token, secret);
  if (verify) {
    res.json(verify);
    console.log(verify);
  } else {
    res.status(401).json({ error: "Not authorized" });
  }
});

module.exports = router;
