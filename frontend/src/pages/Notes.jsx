import { useContext, useEffect, useState } from "react";
import axios from "../config/axios";
import AuthContext from "../context/AuthContext";

const Notes = () => {
  const { user, logout } = useContext(AuthContext);
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
    <div>
      <h1>{`Welcome, ${user?.name || "User"}!`}</h1>
      <h2>Your Notes</h2>

      {/* Note list */}
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
