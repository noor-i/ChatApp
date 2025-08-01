import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User2Icon } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* WEBSITE LOGO AND TITLE */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chai-Chat</h1>
            </Link>
          </div>
          {/* SETTINGS AND SETTINGS LOGO*/}
          <div className="flex items-center gap-2">
            <Link to="/settings" className="btn btn-sm gap-2 transition-colors">
              <Settings className="size-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
          </div>
          {authUser && (
            <>
              <Link to="/profile" className="btn btn-sm gap-2">
                <User2Icon className="size-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <button
                className="flex gap-2 items-center btn btn-md bg-primary/40"
                onClick={logout}
              >
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
