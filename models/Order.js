const Datastore = require("nedb-promise");

const orders = new Datastore({
  filename: "./data/orders.db",
  autoload: true
});
const users = new Datastore({
  filename: "./data/users.db",
  autoload: true
});

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
  async create(body, userID, id) {
    let price = 0;
    let chosenItems = orders.find({ _id: id }, { $in: body.items });

    for (let i = 0; i < chosenItems.length; i++) {
      price += chosenItems[i].price;
    }

    const order = {
      owner: userID,
      timeStamp: Date.now(), // add server side
      status: "inProcess", // done
      items: body.items,
      orderValue: price
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
