const Datastore = require("nedb-promise");
const products = new Datastore({
  filename: "./data/products.db",
  autoload: true
});

// Insert products to database "products.db"

// const productsObj = require("../products.json");
// products.insert(productsObj);

module.exports = {
  // List all products
  async all() {
    return await products.find({});
  },

  // Get specific product
  async getOne(id) {
    return await products.findOne({ _id: id });
  },

  // Create new product
  async create(body) {
    const newProduct = {
      _id: body.id,
      serial: body.serial,
      title: body.title,
      price: body.price,
      shortDesc: body.shortDesc,
      longDesc: body.longDesc,
      imgFile: body.imgFile
    };
    return await products.insert(newProduct);
  },

  // Delete specific product
  async delete(id) {
    return await products.remove({ _id: id });
  },

  // Edit and update specific product
  async update(id, body) {
    let product = await products.findOne({ _id: id }, { $set: body });
    product = await products.update(product, { $set: body });
    return product;
  }
};
