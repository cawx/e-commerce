"use client";
import Link from "next/link";
import { login } from "../api/auth";
import { useActionState } from "react";

const initialState = {
  message: "",
};

function LoginModal() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div>
      <div>
        <h1>login</h1>
        <form className="flex flex-col" action={formAction}>
          <input name="username" placeholder="username" type="text" />
          <input name="password" placeholder="password" type="password" />

          <button disabled={pending} type="submit" className="w-6">
            submit
          </button>
          <Link href="/register">Create an account</Link>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
