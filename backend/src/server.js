const express = require("express");

const app = express();
const port = 8081;
const cors = require("cors");
app.use(cors());

app.use(express.json());
const knex = require("knex")(require("../knexfile.js")["development"]);

app.get("/", (req, res) => {
  res.send(`Hello User! I've received a ${req.method} request.`);
});

app.get("/api", (req, res) => {
  res.send("This is the mouthsounds API.");
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

app.get("/sightwords/", (req, res) => {
  knex("sightwords")
    .select("word")
    .then((word) => {
      res.status(200).json(word);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
