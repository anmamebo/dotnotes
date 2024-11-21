import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../components/Header";
import axios from "../config/axios";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/notes", data);
      setNotes([...notes, res.data.note]);
      setMessage(res.data.message);
      reset();
    } catch (err) {
      setMessage(err.response?.data?.message);
    }
  };

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
        <div className="flex flex-col">
          <h2>Create Note</h2>
          <form
            className="flex flex-col items-center w-full gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col w-full">
              <label className="text-md">Title</label>
              <input
                type="text"
                className="mt-1 border-b p-2 py-1"
                id="title"
                {...register("title", { required: true })}
              />
              {errors.title && <span>This field is required</span>}
            </div>

            <div className="flex flex-col w-full">
              <label className="text-md">Content</label>
              <input
                type="text"
                className="mt-1 border-b p-2 py-1"
                id="content"
                {...register("content", { required: true })}
              />
              {errors.content && <span>This field is required</span>}
            </div>

            <button
              type="submit"
              className="px-4 py-2 border-black border w-1/2"
            >
              Crear
            </button>

            {message && <span>{message}</span>}
          </form>

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
      </main>
    </>
  );
};

export default Notes;
