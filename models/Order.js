const Datastore = require("nedb-promise");

const orders = new Datastore({
  filename: "./data/orders.db",
  autoload: true
});

const Product = require("./Product");
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
    let value = 0;
    const productPrice = body.items.forEach(async item => {
      const itemObj = await Product.getOne(item);
      let itemPrice = itemObj.price;
      value += itemPrice;
    });
    console.log(value);

    const order = {
      owner: userID,
      timeStamp: Date.now(), // add server side
      status: "inProcess", // done
      items: body.items,
      orderValue: value
    };
    const newOrder = await orders.insert(order);

    // Insert order in array after inserting order into database
    await users.update(
      {
        _id: userID
      },
      {
        $push: {
          orderHistory: newOrder._id
        }
      }
    );
  }
};
