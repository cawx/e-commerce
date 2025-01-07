"use server";

import { redirect } from "next/navigation";

const API_URL = process.env.API_URL || "http://localhost:8080";

export async function register(prevState: unknown, formData: FormData) {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });

    if (!res.ok) {
      const json = await res.json();
      return { message: json.message || "please enter valid credentials" };
    }
    redirect("/login");
  } catch (err) {
    return { message: "server error " + err };
  }
}

export async function login(prevState: unknown, formData: FormData) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
    });

    if (res.ok) {
      console.log("login success");
    } else {
      const json = await res.json();
      return { message: json.message || "please enter valid credentials" };
    }
    redirect("/");
  } catch (err) {
    return { message: "server error " + err };
  }
}

export async function logout() {
  try {
    const res = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      console.log("Logged out successfully!");
      redirect("/login");
    } else {
      const err = await res.json();
      console.log(err.message || "Failed to log out");
    }
  } catch (err) {
    console.log(err);
  }
}
