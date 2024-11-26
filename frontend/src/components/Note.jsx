import PencilIcon from "./Icons/PencilIcon";
import TrashIcon from "./Icons/TrashIcon";

const Note = ({ title, content, createdAt, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col gap-2 bg-white rounded-md p-4 shadow-md h-[200px]">
      {/* Card Header */}
      <div className="flex justify-between items-center">
        {/* Note title */}
        <h2 className="font-semibold text-lg truncate">{title}</h2>
        {/* Note actions */}
        <div className="flex gap-4 text-gray-500">
          <button>
            <PencilIcon />
          </button>
          <button>
            <TrashIcon />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-grow overflow-hidden">
        {/* Note content */}
        <p className="text-sm text-gray-700 line-clamp-4">{content}</p>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-end">
        {/* Note date */}
        <span className="text-xs text-gray-400">{createdAt}</span>
      </div>
    </div>
  );
};

export default Note;
