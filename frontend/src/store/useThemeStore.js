import React from "react";
import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("theme") || "cupcake",
  setTheme: (theme) => {
    localStorage.setItem("theme", theme); // Save theme to local storage
    set({ theme }); // Update state
  },
}));
