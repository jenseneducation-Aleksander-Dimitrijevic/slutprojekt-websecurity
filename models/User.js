const Datastore = require("nedb-promise");
const users = new Datastore({
  filename: "./data/users.db",
  autoload: true
});
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  // async function that takes 1 parameter
  /*
    This function checks if password match the repeat password.
    if not, the return false else continue creating user.
  */
  async register(body) {
    if (body.password === body.repeatPassword) {
      const user = await users.findOne({ email: body.email });
      if (user) {
        return false;
      } else {
        // use bcrypt to hash the entered password
        const passwordHash = await bcrypt.hash(body.password, 10);

        // new user is created using an object
        const newUser = {
          email: body.email,
          password: passwordHash,
          role: "customer",
          name: body.name,
          adress: {
            street: body.adress.street,
            zip: body.adress.zip,
            city: body.adress.city
          },
          orderHistory: []
        };
        // insert object in database
        return await users.insert(newUser);
      }
    } else {
      return false;
    }
  },

  async auth(body) {
    const user = await users.findOne({ email: body.email });
    if (!user) {
      return false;
    } else {
      const isMatch = await bcrypt.compare(body.password, user.password);
      if (isMatch) {
        const payload = {
          userID: user._id,
          role: user.role
        };
        const token = jwt.sign(payload, process.env.SECRET);
        return {
          token: token,
          user: {
            email: user.email,
            name: user.name,
            role: user.role,
            adress: {
              street: user.adress.street,
              city: user.adress.city,
              zip: user.adress.zip
            },
            orderHistory: user.orderHistory
          }
        };
      } else {
        return false;
      }
    }
  }
};
