const express = require("express");
const app = express();
const userRoutes = require("./routes/users");
const productsRouter = require("./routes/products");
app.use(express.static("public"));
app.use(express.urlencoded());
app.use(express.json());

app.use("/register", userRoutes);
// app.use("/", productsRouter);
// app.get("/api/products", (req, res) => {
//   res.json([
//     {
//       _id: 1,
//       title: "Awesome shit",
//       price: 1337,
//       shortDesc: "lorem ipsum",
//       longDesc: "loredm dfsfsafmlfds",
//       imgFile: "skateboard-greta.png"
//     }
//   ]);
// });

app.listen(8080, () => console.log("Server started"));
