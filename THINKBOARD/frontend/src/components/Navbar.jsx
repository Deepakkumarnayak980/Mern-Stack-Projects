import React from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-green-900 border-b border-emerald-700/40">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <h1 className="text-3xl font-bold text-emerald-400 font-mono tracking-tight">
            ThinkBoard
          </h1>

          {/* New Note Button */}
          <Link
            to="/create"
            className="flex items-center gap-2
                       rounded-lg border border-emerald-400
                       px-5 py-2
                       text-emerald-400 font-semibold
                       hover:bg-emerald-400 hover:text-green-900
                       hover:scale-105 transition"
          >
            <PlusIcon className="size-5 stroke-[2.5]" />
            <span>New Note</span>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
