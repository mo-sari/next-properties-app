"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUserContext } from "../contexts/AuthContext";

const LoginPage = () => {
  const { fetchUser } = useUserContext();
  const router = useRouter();
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/login", {
        email,
        password: pwd,
      });
      await fetchUser();
      setEmail("");
      setPwd("");
      router.push("/");
    } catch (err) {
      const error = err.response.data;
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg(error["error"]);
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="bg-gray-100 shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 rounded-lg p-5">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  autoComplete="new-email"
                  id="email"
                  required
                  ref={emailRef}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border border-slate-200"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password ?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  id="password"
                  required
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border border-slate-200"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!email || !pwd ? true : false}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 duration-200"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm/6 text-gray-500 mb-4">
            Already have an account?
            <Link
              href="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1 "
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
