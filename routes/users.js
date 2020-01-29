const { Router } = require("express");
const router = new Router();
const User = require("../models/User");

router.post("/api/register", async (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    adress: {
      street: req.body.adress.street,
      zip: req.body.adress.zip,
      city: req.body.adress.city
    }
  };
  const user = await User.register(newUser);
  res.json(user);
});

module.exports = router;
