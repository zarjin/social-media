import React from "react";
import { Link } from "react-router";
import { Home, CircleUserRound, ImagePlus, LogIn, LogOut } from "lucide-react";

export default function Navbar() {
  return (
    <main className="w-full h-16 bg-[#232323] text-[#e5e5e5] flex items-center justify-around">
      <div className="logo font-semibold cursor-pointer">LOGO</div>
      <nav className=" flex  items-center space-x-24">
        <li className="list-none">
          <Link to="/">
            <Home />
          </Link>
        </li>

        <li className="list-none">
          <Link to="/create-post">
            <ImagePlus />
          </Link>
        </li>

        <li className="list-none">
          <Link to="/profile">
            <CircleUserRound />
          </Link>
        </li>
      </nav>

      <div className="auth space-x-3">
        <button className="cursor-pointer">
          <LogIn />
        </button>

        <button className="cursor-pointer">
          <LogOut />
        </button>
      </div>
    </main>
  );
}
