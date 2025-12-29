import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Notecard = ({ note, onDelete }) => {
  return (
    <Link
      to={`/note/${note._id}`}
      className="
        card 
        bg-green-900 
        border-b 
        border-white
        rounded-xl
        hover:bg-green-800
        hover:shadow-lg
        transition-all 
        duration-200
      "
    >
      {/* ✅ Inner spacing added */}
      <div className="card-body p-5">
        {/* Title */}
        <h3 className="card-title text-emerald-300 font-bold mb-1">
          {note.title}
        </h3>

        {/* Content */}
        <p className="text-emerald-100/80 line-clamp-3 mb-4">
          {note.content}
        </p>

        {/* ✅ Same line: date + icons */}
        <div className="flex justify-between items-center flex-nowrap">
          {/* Date */}
          <span className="text-sm text-emerald-200/60">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>

          {/* Icons */}
          <div className="flex items-center gap-3">
            <PenSquareIcon className="size-4 text-emerald-300 hover:text-emerald-200 cursor-pointer" />

            <button
              className="btn btn-ghost btn-xs text-red-400 hover:text-red-300"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete?.(note._id);
              }}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Notecard;
