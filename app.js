const express = require("express");
const app = express();
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");

app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());

app.use("/", userRoutes);
app.use("/", productRoutes);

app.listen(8080, () => console.log("Server started"));
