const Datastore = require("nedb-promise");

const orders = new Datastore({
  filename: "./data/orders.db",
  autoload: true
});

const Product = require("./Product");
const User = require("./User");

module.exports = {
  // List all orders
  async getOrders() {
    return await orders.find({});
  },

  // Get order(s) from specific user
  async getOneOrder(userID) {
    return await orders.find({ owner: userID });
  },

  // Create new order and attach it to specific user
  async create(body, userID) {
    // set total amount initially to value 0
    let total = 0;

    // create a variable that holds body.items which is an array
    const itemsArray = body.items;

    // Loop through array and retrieve price for each product
    for (let item of itemsArray) {
      let product = await Product.getOne(item);

      // add price to total after each iteration
      total += product.price;
    }

    const order = {
      owner: userID,
      timeStamp: Date.now(), // add server side
      status: "inProcess", // done
      items: body.items,
      orderValue: total // set the total amount in orderValue
    };
    const newOrder = await orders.insert(order);

    await User.storeUserPayments(userID, body.payment);
    await User.updateUserOrder(userID, newOrder._id);
    return newOrder;
  }
};
