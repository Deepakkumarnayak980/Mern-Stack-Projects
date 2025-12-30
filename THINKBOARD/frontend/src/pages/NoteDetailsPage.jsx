import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../lib/axios";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch {
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch {
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch {
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoaderIcon className="size-10 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">

        {/* Back + Delete */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="btn btn-ghost text-emerald-400 flex items-center gap-2"
          >
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <Trash2Icon
            onClick={handleDelete}
            className="size-5 text-red-400 cursor-pointer hover:text-red-300"
          />
        </div>

        {/* Card */}
        <div className="card bg-green-900 border border-emerald-700/40 rounded-2xl shadow-lg">
          <div className="card-body p-6 space-y-6">

            <h2 className="card-title text-2xl text-emerald-400">
              Edit Note
            </h2>

            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-emerald-300">
                  Title
                </span>
              </label>
              <textarea
                className="
                  textarea
                  textarea-bordered
                  rounded-xl
                  bg-black
                  text-emerald-100
                  border-emerald-700
                  focus:border-emerald-400
                  h-12
                  w-full
                  p-3
                  resize-none
                "
                value={note.title}
                onChange={(e) =>
                  setNote({ ...note, title: e.target.value })
                }
              />
            </div>

            {/* Content */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-emerald-300">
                  Content
                </span>
              </label>
              <textarea
                className="
                  textarea
                  textarea-bordered
                  rounded-xl
                  bg-black
                  text-emerald-100
                  border-emerald-700
                  focus:border-emerald-400
                  h-64
                  w-full
                  p-4
                  resize-y
                  leading-relaxed
                "
                value={note.content}
                onChange={(e) =>
                  setNote({ ...note, content: e.target.value })
                }
              />
            </div>

            {/* Save */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="
                  btn
                  bg-emerald-600
                  hover:bg-emerald-500
                  text-white
                  rounded-full
                  px-8
                  py-4
                "
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
