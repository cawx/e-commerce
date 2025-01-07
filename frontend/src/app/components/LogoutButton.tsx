import React from "react";
import { logout } from "../api/auth";

function LogoutButton() {
  return (
    <div>
      <form action={logout}>
        <button type="submit">log out</button>
      </form>
    </div>
  );
}

export default LogoutButton;
