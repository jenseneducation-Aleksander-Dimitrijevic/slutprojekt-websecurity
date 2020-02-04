const express = require("express");
const app = express();

// Require controllers
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());

// Handle resources using express middleware
app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", orderRoutes);

app.listen(8080, () => console.log("Server started"));
