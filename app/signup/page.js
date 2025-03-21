"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaTimes, FaCheck } from "react-icons/fa";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%]).{8,24}$/;

const SignupPage = () => {
  const router = useRouter();
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/users/signup", {
        username,
        email,
        password: pwd,
      });
      setUsername("");
      setPwd("");
      setMatchPwd("");
      setEmail("");

      router.push("/login");
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
            Create a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "hide"}
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
                <FaCheck className={validEmail ? "valid" : "hide"} />
                <FaTimes
                  className={validEmail || !email ? "hide" : "invalid"}
                />
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  ref={emailRef}
                  autoComplete="new-email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validEmail ? "false" : "true"}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border border-slate-200"
                />
              </div>
              <p
                id="emailnote"
                className={
                  emailFocus && email && !validEmail ? "instructions" : "hide"
                }
              >
                Enter a valid email address.
                <br />
                Must include an "@" symbol and a domain (e.g.,
                example@example.com).
                <br />
                Only letters, numbers, dots, underscores, and hyphens are
                allowed before the "@".
                <br />
                The domain must have at least one dot (e.g., .com, .org).
              </p>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Username:
                <FaCheck className={validName ? "valid" : "hide"} />
                <FaTimes
                  className={validName || !username ? "hide" : "invalid"}
                />
              </label>
              <div className="mt-2">
                <input
                  type="username"
                  name="username"
                  id="username"
                  autoComplete="new-username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border border-slate-200"
                />
              </div>
              <p
                id="uidnote"
                className={
                  userFocus && username && !validName ? "instructions" : "hide"
                }
              >
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password:
                  <FaCheck className={validPwd ? "valid" : "hide"} />
                  <FaTimes className={validPwd || !pwd ? "hide" : "invalid"} />
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border border-slate-200"
                />
              </div>
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "hide"}
              >
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">?</span>{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="re_password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Confirm Password:
                  <FaCheck
                    className={validMatch && matchPwd ? "valid" : "hide"}
                  />
                  <FaTimes
                    className={validMatch || !matchPwd ? "hide" : "invalid"}
                  />
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="re_password"
                  id="re_password"
                  autoComplete="new-password"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border border-slate-200"
                />
              </div>
              <p
                id="confirmnote"
                className={matchFocus && !validMatch ? "instructions" : "hide"}
              >
                Must match the first password input field.
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={!validName || !validPwd || !validMatch ? true : false}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 duration-200"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm/6 text-gray-500 mb-4">
            Already have an account ?
            <Link
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500 "
            >
              {"  "}
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
