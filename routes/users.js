const { Router } = require("express");
const router = new Router();
const User = require("../models/User");
require("dotenv").config();

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
  if (!authUser) {
    res.status(401).json({ message: "Not authorized" });
  } else {
    res.status(200).json(authUser);
  }
});

module.exports = router;
