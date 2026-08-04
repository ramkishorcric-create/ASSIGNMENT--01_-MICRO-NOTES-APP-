const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Our "database" for this assignment — just an array in memory.
// It resets every time the server restarts, and that's fine for now.
let notes = [];
let nextId = 1;

// TODO 1: GET /api/notes — send back the notes array
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// TODO 2: POST /api/notes — build a note from req.body, add it to the array, send it back
app.post("/api/notes", (req, res) => {
  const newNote = {
    id: nextId++,
    title: req.body.title,
    content: req.body.content,
    createdAt: new Date(),
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.listen(5000, () => console.log("Server running on port 5000"));
