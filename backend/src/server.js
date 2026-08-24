const express = require("express");

const app = express();
const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Root path works");
});

app.get("/api", (req, res) => {
  res.send("API path works");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
