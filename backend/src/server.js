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

app.get("/children", (req, res) => {
  knex("children")
    .select("*")
    .then((user) => {
      res.status(200).json(user);
    });
});

app.get("/guardians", (req, res) => {
  knex("guardians")
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

app.get("/sightwords", (req, res) => {
  const { gradelevel } = req.query;

  knex("sightwords")
    .select("*")
    .where("gradelevel", gradelevel)
    .then((data) => {
      res.json(data);
    });
});

app.get("/lettersounds", (req, res) => {
  knex("letter_sounds")
    .select("*")
    .then((data) => {
      res.status(200).json(data);
    });
});

app.post("/practice-sessions", async (req, res) => {
  try {
    const [session] = await knex("practice_sessions")
      .insert(req.body)
      .returning("*");

    res.status(201).json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create practice session" });
  }
});

app.post("/practice-attempts", async (req, res) => {
  try {
    const [attempt] = await knex("practice_attempts")
      .insert(req.body)
      .returning("*");

    res.status(201).json(attempt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not save practice attempt" });
  }
});

app.patch("/practice-sessions/:id", async (req, res) => {
  try {
    const [session] = await knex("practice_sessions")
      .where("id", req.params.id)
      .update(req.body)
      .returning("*");

    res.status(200).json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update practice session" });
  }
});

app.post("/children", async (req, res) => {
  try {
    const [child] = await knex("children").insert(req.body).returning("*");

    res.status(201).json(child);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Could not create child",
    });
  }
});

app.post("/guardians", async (req, res) => {
  try {
    const [guardian] = await knex("guardians").insert(req.body).returning("*");

    res.status(201).json(guardian);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Could not create guardian",
    });
  }
});

app.post("/child-guardians", async (req, res) => {
  try {
    const { child_id, guardian_id, relationship } = req.body;

    const [link] = await knex("child_guardians")
      .insert({
        child_id,
        guardian_id,
        relationship,
      })
      .returning("*");

    res.status(201).json(link);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Could not associate guardian with child",
    });
  }
});

app.get("/children/:id/guardians", async (req, res) => {
  try {
    const guardians = await knex("child_guardians")
      .join("guardians", "child_guardians.guardian_id", "guardians.id")
      .select(
        "guardians.id",
        "guardians.first_name",
        "guardians.last_name",
        "guardians.email",
        "child_guardians.relationship",
      )
      .where("child_guardians.child_id", req.params.id);

    res.status(200).json(guardians);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Could not retrieve guardians for child",
    });
  }
});

app.get("/children/:id/results", async (req, res) => {
  try {
    const results = await knex("children")
      .join("practice_sessions", "children.id", "practice_sessions.child_id")
      .select(
        "children.id as child_id",
        "children.first_name",
        "children.last_name",
        "practice_sessions.id as session_id",
        "practice_sessions.activity_type",
        "practice_sessions.mode",
        "practice_sessions.gradelevel",
        "practice_sessions.score",
        "practice_sessions.started_at",
        "practice_sessions.ended_at",
      )
      .where("children.id", req.params.id)
      .orderBy("practice_sessions.started_at", "asc");

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Could not retrieve results for child",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
