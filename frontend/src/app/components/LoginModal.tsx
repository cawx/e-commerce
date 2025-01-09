"use client";
import Link from "next/link";
import { useState, FormEvent } from "react";

interface State {
  message: string;
}

const initialState: State = {
  message: "",
};

function LoginModal() {
  const [state, setState] = useState<State>(initialState);
  const [pending, setPending] = useState<boolean>(false);

  const formAction = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setState({ message: "Login successful" });
        console.log("Login successful", responseData);
      } else {
        const errorData = await response.json();
        setState({ message: errorData.message || "invalid credentials" });
      }
    } catch (error) {
      setState({ message: "login failed" });
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      <div>
        <h1>Login</h1>
        <form className="flex flex-col" onSubmit={formAction}>
          <input name="username" placeholder="Username" type="text" required />
          <input
            name="password"
            placeholder="Password"
            type="password"
            required
          />
          <button disabled={pending} type="submit" className="w-6">
            Submit
          </button>
        </form>
        {state.message && <p>{state.message}</p>}
        <Link href="/register">Create an account</Link>
      </div>
    </div>
  );
}

export default LoginModal;
