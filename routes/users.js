const { Router } = require("express");
const router = new Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.post("/api/register", async (req, res) => {
  const newUser = {
    email: req.body.email,
    password: await bcrypt.hash(req.body.password),
    name: req.body.name,
    street: req.body.street,
    zip: req.body.zip,
    city: req.body.city
  };
  const user = await User.register(newUser);
  res.json(user);
});

module.exports = router;
