const express = require("express");

const app = express();
const port = 8081;

app.use(express.json());
const knex = require("knex")(require("../knexfile.js")["development"]);

app.get("/", (req, res) => {
  res.send(`Hello User! I've received a ${req.method} request.`);
});

app.get("/api", (req, res) => {
  res.send("This is the JSTAR API.");
});

app.get("/users", (req, res) => {
  knex("users")
    .select("*")
    .then((user) => {
      res.status(200).json(user);
    });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  knex("users")
    .where("id", id)
    .then((user) => {
      res.status(200).json(user);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
