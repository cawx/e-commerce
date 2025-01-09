"use client";
import Link from "next/link";
import { useState, FormEvent } from "react";

interface State {
  message: string;
  type: "error" | "success" | "";
}

const initialState: State = {
  message: "",
  type: "",
};

function LoginModal() {
  const [state, setState] = useState<State>(initialState);
  const [pending, setPending] = useState<boolean>(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const loginData = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error(`login failed: status ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        setState({
          message: "login success",
          type: "success",
        });
      } else {
        setState({
          message: "login success",
          type: "success",
        });
      }
    } catch (err) {
      setState({ message: `login failed: ${err}`, type: "error" });
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      <div>
        <h1>Login</h1>
        <form className="flex flex-col" onSubmit={handleLogin}>
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
