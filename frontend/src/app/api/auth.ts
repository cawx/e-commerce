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
  } catch (err) {
    return { message: "server error " + err };
  }
  redirect("/login");
}

export async function login(formData: FormData) {
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
      console.log("FE login was successful");
    } else {
      const json = await res.json();
      return { message: json.message || "please enter valid credentials" };
    }
  } catch (err) {
    return { message: "server error " + err };
  }
}

export async function logout() {
  console.log("Logout function called");
  try {
    const res = await fetch(`${API_URL}/logout`, {
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
    } else {
      console.log("Status:", res.status);
      console.log("Status Text:", res.statusText);
    }
  } catch (err) {
    console.log("Error during logout:", err);
  }
  redirect("/");
}
