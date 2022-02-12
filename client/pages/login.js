import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import LoginRegisterForm from "../components/LoginRegisterForm";
import firebase from "../firebase";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPass, setRegisterPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, toggleIsLogin] = useState(true);
  const router = useRouter();
  const auth = getAuth(firebase);

  const register = async () => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, registerEmail, registerPass)
      .then((user) => {
        console.log("REGISTER", user);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast(err.message);
        setLoading(false);
      });
  };

  const login = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, loginEmail, loginPass)
      .then((user) => {
        console.log("LOGIN", user);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast(err.message);
        setLoading(false);
      });
  };

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        console.log("LOGIN", result.user);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast(err.message);
      });
  };

  const toggleForm = () => toggleIsLogin(!isLogin);

  return (
    <div className="container">
      <h2 className="text-center pt-4 display-4">
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="my-5">{isLogin ? "Login" : "Register"}</div>
        )}
      </h2>

      <div className="d-flex justify-content-evenly">
        <button
          type="button"
          onClick={googleLogin}
          className="btn btn-danger rounded-pill col-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-google mx-2"
            viewBox="0 0 16 16"
          >
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
          </svg>
          Login with Google
        </button>
      </div>

      <div className="d-flex justify-content-center mt-3">
        <LoginRegisterForm
          email={isLogin ? loginEmail : registerEmail}
          setEmail={isLogin ? setLoginEmail : setRegisterEmail}
          pass={isLogin ? loginPass : registerPass}
          setPass={isLogin ? setLoginPass : setRegisterPass}
          handleSubmit={isLogin ? login : register}
          buttonName={isLogin ? "Login" : "Register"}
          toggleForm={toggleForm}
          toggleText={isLogin ? "Sign in" : "Go to Login"}
        />
      </div>

      {isLogin ? (
        <div className="d-flex justify-content-center mt-1">
          <Link href="/reset-password">
            <a className="btn btn-outline-danger btn-sm">Reset Password</a>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Login;
