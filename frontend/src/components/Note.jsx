import { useState } from "react";
import { useTranslation } from "react-i18next";
import PencilIcon from "./Icons/PencilIcon";
import TrashIcon from "./Icons/TrashIcon";

const Note = ({ id, title, content, createdAt, onEdit, onDelete }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleConfirmEdit = () => {
    onEdit(id, { title: editedTitle, content: editedContent });
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <div className="flex flex-col gap-2 bg-white rounded-md p-4 shadow-md h-[200px]">
      {/* Card Header */}
      <div className="flex justify-between items-center gap-2">
        {/* Note title */}
        {isEditing ? (
          <input
            type="text"
            className="font-semibold text-lg border-b w-full px-2"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <>
            <h2 className="font-semibold text-lg truncate">{title}</h2>

            {/* Note actions */}
            <div className="flex gap-4 text-gray-500">
              <button
                onClick={handleEditClick}
                aria-label={t("notes.form.editButton")}
                title={t("notes.form.editButton")}
              >
                <PencilIcon />
              </button>
              <button
                onClick={handleDeleteClick}
                aria-label={t("notes.form.deleteButton")}
                title={t("notes.form.deleteButton")}
              >
                <TrashIcon />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Card Body */}
      <div className="flex-grow overflow-hidden">
        {/* Note content */}
        {isEditing ? (
          <textarea
            className="w-full h-full resize-none border-b px-2"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          ></textarea>
        ) : (
          <p className="text-sm text-gray-700 line-clamp-4">{content}</p>
        )}
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-end">
        {isEditing ? (
          <button
            onClick={handleConfirmEdit}
            className="px-4 py-2 text-sm bg-black hover:bg-transparent hover:text-black border border-black text-white rounded"
            aria-label={t("notes.form.saveButton")}
            title={t("notes.form.saveButton")}
          >
            {t("notes.form.saveButton")}
          </button>
        ) : (
          <>
            {/* Note date */}
            <span className="text-xs text-gray-400">{createdAt}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Note;
