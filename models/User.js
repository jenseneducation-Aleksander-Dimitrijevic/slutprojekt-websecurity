const Datastore = require("nedb-promise");
const users = new Datastore({
  filename: "./models/data/users.db",
  autoload: true
});

async function register(email, password, name, street, zip, city) {
  const newUser = {
    email: email,
    password: password,
    name: name,
    adress: {
      street: street,
      zip: zip,
      city: city
    }
  };
  return await users.insert({ newUser });
}

module.exports = { register };
