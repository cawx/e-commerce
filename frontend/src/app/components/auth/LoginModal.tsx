"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

interface ModalProps {
  isOpen: boolean;
  onClose: (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => void;
}

function LoginModal({ isOpen, onClose }: ModalProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await fetch(`http://localhost:8080/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("Invalid username or password");
        return;
      }

      setSuccess(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 right-0 z-[200] bg-[#F2F2F2] h-screen"
      >
        <div className="w-[30vw] section-padding py-[5%] flex flex-col justify-between h-full">
          <div className="font-semibold text-2xl tracking-tighter font-inter flex items-center justify-between">
            <span>ClubPenguin</span>
            <button onClick={onClose}>
              <Image src="/Close.svg" alt="" width={30} height={30} />
            </button>
          </div>
          <div>
            <h2 className="text-h4 font-archivo mb-4">LOG IN.</h2>
            <form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
              <fieldset>
                <label className="text-base font-medium h-1 font-archivo">
                  USERNAME
                </label>
                <input
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
                    name="password"
                    placeholder="Password..."
                    type={isVisible ? "text" : "password"}
                    required
                    className="border-black/80 border-2 text-base px-2 py-3 bg-transparent w-full pr-10"
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
              {error && <p className="text-red-700">{error}</p>}
              {success && (
                <p className="text-green-700">Successfully logged in.</p>
              )}
              <div className="flex justify-between text-base">
                <button
                  disabled={loading}
                  type="submit"
                  className="bg-[#1e1e1e] flex items-center px-4 lg:px-6 py-2 w-auto text-white/90 font-archivo"
                >
                  {loading ? "Logging in..." : "LOG IN"}
                </button>
                <Link href="/" className="underline self-end">
                  Forgot your password?
                </Link>
              </div>
            </form>
          </div>
          <div>
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
