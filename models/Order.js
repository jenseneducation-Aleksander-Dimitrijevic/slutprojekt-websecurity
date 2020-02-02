const Datastore = require("nedb-promise");
const orders = new Datastore({
  filename: "./data/orders.db",
  autoload: true
});

module.exports = {
  async getOrders() {
    return await orders.find({});
  },
  async create(body) {
    const newOrder = {
      _id: body.id,
      timeStamp: Date.now(), // add server side
      status: "inProcess", // done
      items: body.items,
      orderValue: body.orderValue
    };
    return await orders.insert(newOrder);
  }
};
