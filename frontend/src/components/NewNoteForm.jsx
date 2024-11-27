import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import axios from "../config/axios";

const NewNoteForm = ({ setNotes, notes }) => {
  const { t } = useTranslation();
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
            placeholder={t("notes.form.inputTitle")}
            {...register("title", { required: true })}
          />
        </div>

        {/* Card Body */}
        <div className="relative flex-grow overflow-hidden">
          <textarea
            className="w-full h-full resize-none border-b px-2"
            id="content"
            placeholder={t("notes.form.inputContent")}
            {...register("content", { required: true })}
          ></textarea>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between">
          {/* Error and Feedback Messages */}
          <div className="flex flex-col text-xs text-red-500">
            {message && <span className="text-green-500">{message}</span>}
            {errors.title && (
              <span>{t("notes.form.errors.noteTitleRequired")}</span>
            )}
            {errors.content && (
              <span>{t("notes.form.errors.noteContentRequired")}</span>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-black hover:bg-transparent hover:text-black border border-black text-white rounded"
            aria-label={t("notes.form.createButton")}
            title={t("notes.form.createButton")}
          >
            {t("notes.form.createButton")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewNoteForm;
