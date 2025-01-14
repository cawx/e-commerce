"use client";
import Link from "next/link";
import { useState, FormEvent } from "react";
import Image from "next/image";
import { motion } from "motion/react";

interface State {
  message: string;
  type: "error" | "success" | "";
}

const initialState: State = {
  message: "",
  type: "",
};

interface modalProps {
  isOpen: boolean;
  onClose: (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => void;
}

function LoginModal({ isOpen, onClose }: modalProps) {
  const [state, setState] = useState<State>(initialState);
  const [pending, setPending] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  if (!isOpen) return null;

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
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 right-0 z-[200] bg-[#F2F2F2] h-screen"
      >
        <div className=" w-[30vw] section-padding py-[5%] flex flex-col justify-between h-full">
          <div className=" font-semibold text-2xl tracking-tighter font-inter flex items-center justify-between">
            <span>ClubPenguin</span>
            <button onClick={onClose}>
              <Image src="/Close.svg" alt="" width={30} height={30} />
            </button>
          </div>
          <div>
            <h2 className="text-h4 font-archivo mb-4">LOG IN.</h2>
            <form className="flex flex-col gap-y-5" onSubmit={handleLogin}>
              <fieldset>
                <label className="text-base font-medium h-1 font-archivo">
                  USERNAME
                </label>
                <input
                  aria-label="username"
                  name="username"
                  placeholder="Username..."
                  type="text"
                  required
                  className="border-black/80 border-2 text-base px-2 py-3 bg-transparent w-full"
                />
              </fieldset>
              <fieldset className="relative">
                <label className="text-base font-medium h-1 font-archivo">
                  PASSWORD
                </label>
                <div className="relative">
                  <input
                    aria-label="username"
                    name="password"
                    placeholder="Password..."
                    type="password"
                    required
                    className="border-black/80 relative border-2 text-base px-2 py-3 bg-transparent w-full pr-10"
                  />
                  <span
                    onClick={() => setIsVisible(!isVisible)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  >
                    {isVisible ? (
                      <Image
                        src="/Visibility.svg"
                        alt="Toggle visibility"
                        width={30}
                        height={30}
                        className="pointer-events-none"
                      />
                    ) : (
                      <Image
                        src="/VisibilityOff.svg"
                        alt="Toggle visibility"
                        width={30}
                        height={30}
                        className="pointer-events-none"
                      />
                    )}
                  </span>
                </div>
              </fieldset>

              <div className="flex justify-between text-base">
                <button
                  disabled={pending}
                  type="submit"
                  className=" bg-[#1e1e1e] flex items-center px-4 lg:px-6 py-2 w-auto text-white/90 font-archivo"
                >
                  LOG IN
                </button>
                <Link href="/" className="underline self-end">
                  Forgot your password?
                </Link>
              </div>
            </form>
          </div>
          <div>
            {state.message && <p>{state.message}</p>}
            <Link
              href="/register"
              className="text-base underline font-medium font-inter"
            >
              Don’t have an account? Register here.
            </Link>
          </div>
        </div>
      </motion.aside>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute w-full h-screen bg-black z-[150] opacity-70"
      ></motion.div>
    </div>
  );
}

export default LoginModal;
