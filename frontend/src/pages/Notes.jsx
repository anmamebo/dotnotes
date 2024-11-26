import { useEffect, useState } from "react";
import Header from "../components/Header";
import NewNoteForm from "../components/NewNoteForm";
import Note from "../components/Note";
import axios from "../config/axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("/notes");
        setNotes(res.data);
      } catch (err) {
        setMessage(err.response.data.message);
      }
    };

    fetchNotes();
  }, []);

  const handleEditNote = async (id, updatedNote) => {
    try {
      const res = await axios.put(`/notes/${id}`, updatedNote);
      setNotes(
        notes.map((note) =>
          note._id === id ? { ...note, ...updatedNote } : note
        )
      );
      setMessage(res.data.message);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      setMessage(err.response.data.message);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const res = await axios.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));

      setMessage(res.data.message);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      setMessage(err.response.data.message);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-3">
          {/* Title */}
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-2xl">Your notes</h1>

            {/* Messages */}
            {message && (
              <span className="bg-black text-white rounded px-10 py-1">
                {message}
              </span>
            )}
          </div>

          {/* Notes container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* New Note */}
            <NewNoteForm setNotes={setNotes} notes={notes} />

            {/* Notes */}
            {notes.map((note) => (
              <Note
                key={note._id}
                id={note._id}
                title={note.title}
                content={note.content}
                createdAt={new Date(note.createdAt).toLocaleDateString()}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Notes;
