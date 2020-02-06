const Datastore = require("nedb-promise");
const users = new Datastore({
  filename: "./data/users.db",
  autoload: true
});
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  // store user in database
  async register(body) {
    if (body.password === body.repeatPassword) {
      const user = await users.findOne({ email: body.email });
      if (user) {
        return false;
      } else {
        // use bcrypt to hash user password
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

        // insert new user in database
        return await users.insert(newUser);
      }
    } else {
      return false;
    }
  },

  // verify user during log in
  async auth(body) {
    // check if email exist in database
    const user = await users.findOne({ email: body.email });

    // return false if email doesn't exist in database
    if (!user) {
      return false;
    } else {
      // use bcrypt to hash password
      const isMatch = await bcrypt.compare(body.password, user.password);
      if (isMatch) {
        // payload for json web token
        const payload = {
          userID: user._id,
          role: user.role
        };

        // create token
        const token = jwt.sign(payload, process.env.SECRET);

        // return object containing user data and token
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
  },
  users
};
