const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");

const { routes } = require("./routes");

const userRoutes = require('./routes/userRoutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Object.keys(routes).forEach((routeName) => {
//   app.use(`/api/${routeName}`, routes[routeName]);
// });

app.use('/api/users', userRoutes);
// app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

module.exports = app;
