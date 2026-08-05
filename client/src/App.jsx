import { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

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
      // show newest notes at the top
      setNotes((prevNotes) => [newNote, ...prevNotes]);
      setTitle("");
      setContent("");
      setStatus("Note added successfully.");
    } catch (error) {
      console.error("Failed to add note:", error);
      setStatus("Unable to add note.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const resp = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
      });
      if (resp.ok) {
        setNotes((prev) => prev.filter((note) => note.id !== id));
        setStatus("Note deleted successfully.");
      } else {
        console.error("Failed to delete note:", resp.status);
        setStatus("Unable to delete note.");
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
      setStatus("Unable to delete note.");
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
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={3}
        />
        <button onClick={handleAddNote} disabled={!title.trim()}>
          Add Note
        </button>
        {status && <p className="status-message">{status}</p>}
      </div>

      {loading ? (
        <p className="message">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="message">No notes yet. Add your first one above!</p>
      ) : (
        <ul className="notes-list">
          {notes.map((note) => (
            <li key={note.id} className="note-item">
              <div className="note-header">
                <strong>{note.title}</strong>
                <button onClick={() => handleDelete(note.id)}>Delete</button>
              </div>
              <div className="note-body">
                <span>{note.content}</span>
              </div>
              <div className="note-meta">
                <small>{new Date(note.createdAt).toLocaleString()}</small>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
