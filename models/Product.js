const Datastore = require("nedb-promise");
const products = new Datastore({
  filename: "./data/products.db",
  autoload: true
});

// Insert products to database "products.db"

// const fs = require("fs");
// const productsArr = require("../products.json");
// products.insert(productsArr);

module.exports = {
  async all() {
    return await products.find({});
  }
};
