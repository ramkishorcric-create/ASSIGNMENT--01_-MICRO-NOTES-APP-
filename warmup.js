// ============================================================
// Part A — JavaScript Warm-Up
// Five short exercises to practice core JavaScript skills.
// Run with: node warmup.js
// ============================================================

// A1. Variables & Data Types
const title = "My First Note";
const isPinned = false;
const tags = ["personal", "todo"];

console.log(title, typeof title);
console.log(isPinned, typeof isPinned);
console.log(tags, typeof tags);

// A2. A Simple Function
const makeNote = (title, content) => {
  return { title, content, createdAt: new Date() };
};

console.log(makeNote("Groceries", "Milk, eggs, bread"));

// A3. Arrays: Loop Through Notes
const notes = [
  { title: "Groceries", content: "Milk, eggs" },
  { title: "Workout", content: "Legs day" },
  { title: "Reading", content: "Finish chapter 3" },
];

const titles = notes.map((note) => note.title);
console.log(titles);

// A4. Destructuring & Template Literals
const { title, content } = notes[0];
console.log(`${title}: ${content}`);

// A5. Async/Await Basics
async function getSampleData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await response.json();
  console.log(data);
}

getSampleData();
