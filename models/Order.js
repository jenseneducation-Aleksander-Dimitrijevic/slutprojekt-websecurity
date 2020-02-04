const Datastore = require("nedb-promise");

// Store database inside variable
const orders = new Datastore({
  // Read the file orders.db. If not created initially, then it will be created for us.
  filename: "./data/orders.db",
  autoload: true
});
const users = new Datastore({
  filename: "./data/users.db",
  autoload: true
});

module.exports = {
  // Create an async function that returns all orders.
  async getOrders() {
    return await orders.find({});
  },

  // create an async function that takes 1 parameter.
  // returns one order if ID match owner ID
  async getOneOrder(userID) {
    return await orders.findOne({ owner: userID });
  },

  // create an async function that creates new order(s) and store it inside database.
  // This function takes 2 parameters, body and userID.
  async create(body, userID) {
    // new order is stored inside an object
    const order = {
      owner: userID,
      timeStamp: Date.now(), // add server side
      status: "inProcess", // done
      items: body.items,
      orderValue: body.orderValue
    };

    // order object is then inserted in database
    // store the inserted data in variable "newOrder"
    const newOrder = await orders.insert(order);

    // after insertion, we then update orderHistory, which is an empty array initially, with the new order.
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
