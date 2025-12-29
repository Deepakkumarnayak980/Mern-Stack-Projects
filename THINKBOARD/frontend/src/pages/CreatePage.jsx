
import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../lib/axios";

function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleFormSubmit(e) {
    e.preventDefault();

    // if (!title.trim() || !content.trim()) {
    //   toast.error("All fields are required");
    //   return;
    // }

    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });

      toast.success("Note created successfully!");
      navigate("/");
    }  catch (error) {
      console.error("Error creating note", error);

      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    }
      finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">

        {/* Back button */}
        <Link
          to="/"
          className="btn btn-ghost text-emerald-400 mb-6 flex items-center gap-2"
        >
          <ArrowLeftIcon className="size-5" />
          <span>Back to Notes</span>
        </Link>

        {/* Card */}
        <div className="card bg-green-900 border border-emerald-700/40 rounded-2xl shadow-lg">
          <div className="card-body p-6">
            <h2 className="card-title text-2xl text-emerald-400 mb-6">
              Create New Note
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-6">

              {/* Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-emerald-300">
                    Title
                  </span>
                </label>
                <textarea
                  placeholder="Note title"
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  placeholder="Write your note here..."
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
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="
                    btn
                    bg-emerald-600
                    hover:bg-emerald-500
                    text-white
                    rounded-full
                    px-8
                    py-4
                  "
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
