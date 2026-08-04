import { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  // TODO 3: on page load, fetch all notes from GET /api/notes
  // hint: use useEffect + async/await, same pattern as warmup.js A5
  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch("http://localhost:5000/api/notes");
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, []);

  // TODO 4: send a POST request with { title, content }, then update the list
  const handleAddNote = async () => {
    if (!title.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const newNote = await response.json();
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  return (
    <div className="container">
      <h1>📝 MicroNotes</h1>
      <p className="subtitle">A tiny full-stack notes app</p>

      <div className="form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <button onClick={handleAddNote} disabled={!title.trim()}>
          Add Note
        </button>
      </div>

      {loading ? (
        <p className="message">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="message">No notes yet. Add your first one above!</p>
      ) : (
        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note.id} className="note-item">
              <strong>{note.title}</strong>
              <span>{note.content}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
