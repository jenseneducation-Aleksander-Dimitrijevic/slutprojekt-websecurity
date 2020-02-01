const { Router } = require("express");
const router = new Router();
const User = require("../models/User");
const auth = require("./auth");
const jwt = require("jsonwebtoken");

router.post("/api/register", async (req, res) => {
  const user = await User.register(req.body);
  if (user) {
    res.json(user);
  } else {
    res.send("Something went wrong yao...");
  }
});

router.post("/api/auth", async (req, res) => {
  const authUser = await User.login(req.body);
  const verify = jwt.verify(authUser.token, process.env.SECRET);
  if (verify) {
    res.json(verify);
    console.log(verify);
  } else {
    res.status(401).json({ error: "Not authorized" });
  }
});

module.exports = router;
