"use client";
import Link from "next/link";
import { register } from "@/app/api/auth";
import { useActionState } from "react";

const initialState = {
  message: "",
};

function Register() {
  const [state, formAction, pending] = useActionState(register, initialState);

  return (
    <div>
      <div>
        <h1>register</h1>
        <form className="flex flex-col" action={formAction}>
          <input name="username" placeholder="username" type="text" />
          <input name="password" placeholder="password" type="password" />

          <button disabled={pending} type="submit" className="w-6">
            submit
          </button>
          <Link href="/">Already have an account? Log in.</Link>
        </form>
        <p>{state.message}</p>
      </div>
    </div>
  );
}

export default Register;
