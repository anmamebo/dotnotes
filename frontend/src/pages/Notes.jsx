import { useEffect, useState } from "react";
import Header from "../components/Header";
import NewNoteForm from "../components/NewNoteForm";
import Note from "../components/Note";
import axios from "../config/axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("/notes");
        setNotes(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotes();
  }, []);

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-3">
          {/* Title */}
          <h1 className="font-semibold text-xl">Your notes</h1>

          {/* Notes container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* New Note */}
            <NewNoteForm setNotes={setNotes} notes={notes} />

            {/* Notes */}
            {notes.map((note) => (
              <Note
                key={note._id}
                title={note.title}
                content={note.content}
                createdAt={new Date(note.createdAt).toLocaleDateString()}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Notes;
