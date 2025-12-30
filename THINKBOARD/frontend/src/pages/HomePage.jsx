import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import Notecard from "../components/Notecard";
import { api } from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response?.status === 429) {
          setRateLimited(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-black text-emerald-100">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {/* Loading */}
        {loading && (
          <div className="text-center text-emerald-400 font-semibold py-10">
            Loading notes...
          </div>
        )}

        {/* Rate limited */}
        {!loading && isRateLimited && <RateLimitedUI />}

        {notes.length===0 && !isRateLimited && <NotesNotFound />}

        {/* Notes grid */}
        {!loading && !isRateLimited && notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <Notecard key={note._id} note={note} setNote ={setNotes}/>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !isRateLimited && notes.length === 0 && (
          <div className="text-center text-red-400 font-medium py-10">
            No notes found. Create your first note ✨
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
