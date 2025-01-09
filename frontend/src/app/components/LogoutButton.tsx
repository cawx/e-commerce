"use client";
import React from "react";
import { logout } from "../api/auth";

function LogoutButton() {
  const handleLogout = async () => {
    try {
      const res = await fetch(`http://localhost:8080/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.text();
      console.log("Response from server:", data);

      if (res.ok) {
        console.log("Logged out successfully!");
        console.log("Cookies:", res.headers.get("set-cookie"));
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>log out</button>
    </div>
  );
}

export default LogoutButton;
