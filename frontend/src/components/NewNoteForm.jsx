import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../config/axios";

const NewNoteForm = ({ setNotes, notes }) => {
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
      setNotes([res.data.note, ...notes]);
      setMessage(res.data.message);
      reset();

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message);

      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-white rounded-md p-4 shadow-md h-[200px]">
      <form
        className="flex flex-col w-full h-full gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Card Header */}
        <div className="flex flex-col justify-between gap-1">
          <input
            type="text"
            className="font-semibold text-lg border-b w-full px-2"
            id="title"
            placeholder="Title"
            {...register("title", { required: true })}
          />
        </div>

        {/* Card Body */}
        <div className="relative flex-grow overflow-hidden">
          <textarea
            className="w-full h-full resize-none border-b p-2"
            id="content"
            placeholder="Content"
            {...register("content", { required: true })}
          ></textarea>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between">
          {/* Error and Feedback Messages */}
          <div className="flex flex-col text-xs text-red-500">
            {message && <span className="text-green-500">{message}</span>}
            {errors.title && <span>Title is required</span>}
            {errors.content && <span>Content is required</span>}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewNoteForm;
