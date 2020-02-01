const Datastore = require("nedb-promise");
const orders = new Datastore({
  filename: "./data/orders.db",
  autoload: true
});
const user = require("../models/User");

module.exports = {
  async getOrders(id) {
    return await orders.find({ _id: id });
  },
  async create(id, body) {
    const newOrder = {
      _id: id,
      timeStamp: Date.now(), // add server side
      status: "inProcess", // done
      items: body.items,
      orderValue: body.orderValue
    };
    return await orders.insert(newOrder);
  }
};
