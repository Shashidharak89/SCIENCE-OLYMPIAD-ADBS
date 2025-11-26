"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import styles from "./Shell.module.css";

export default function Shell({ children }) {
  const [open, setOpen] = useState(false);

  // close sidebar on escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={styles.shell}>
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        className={`${styles.hamburger} ${open ? styles.open : ""}`}
        onClick={() => setOpen((s) => !s)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`${styles.sidebarWrap} ${open ? styles.show : ""}`}>
        <Sidebar onClose={() => setOpen(false)} isOpen={open} />
      </div>

      <div className={styles.content} onClick={() => open && setOpen(false)}>
        {children}
      </div>
    </div>
  );
}
