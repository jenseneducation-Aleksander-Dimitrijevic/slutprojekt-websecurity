const Datastore = require("nedb-promise");
const users = new Datastore({
  filename: "./data/users.db",
  autoload: true
});
const bcrypt = require("bcryptjs");

module.exports = {
  async register(body) {
    const newUser = {
      email: body.email,
      password: await bcrypt(body.password, 10),
      name: body.name,
      adress: {
        street: body.adress.street,
        zip: body.adress.zip,
        city: body.adress.city
      }
    };
    return await users.insert(newUser);
  }
};
