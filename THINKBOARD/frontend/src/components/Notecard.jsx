import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { api } from "../lib/axios";

const Notecard = ({ note, setNote }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // stop Link navigation
    e.stopPropagation(); // extra safety

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNote((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

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
      <div className="card-body p-5">
        <h3 className="card-title text-emerald-300 font-bold mb-1">
          {note.title}
        </h3>

        <p className="text-emerald-100/80 line-clamp-3 mb-4">
          {note.content}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-sm text-emerald-200/60">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>

          <div className="flex items-center gap-3">
            <PenSquareIcon className="size-4 text-emerald-300 hover:text-emerald-200 cursor-pointer" />

            <button
              className="btn btn-ghost btn-xs text-red-400 hover:text-red-300"
              onClick={(e) => handleDelete(e, note._id)}
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
