require("./db/config");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const EventRepo = require("./db/EventRepo");
const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use(cors());

app.get("/api/event", async (req, res) => {
  const events = await EventRepo.getEvents(req.query.title);
  res.send(events);
});

app.post("/api/event", async (req, res) => {
  await EventRepo.createEvent(req.body);
  res.status(201).send();
});

app.patch("/api/event/:id", async (req, res) => {
  await EventRepo.updateEvent({ ...req.body, ...req.params });
  res.status(204).send();
});

app.delete("/api/event/:id", async (req, res) => {
  await EventRepo.deleteEvent(req.params);
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Project Impacta Backend run on port: ${port}`);
});
