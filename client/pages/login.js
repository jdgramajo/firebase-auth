import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  TwitterAuthProvider,
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
        console.log("New user registered:", registerEmail);
        router.push("/");
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === "auth/email-already-in-use") {
          toggleForm();
          setLoginEmail(registerEmail);
          toast.info(
            "Account exists, please login or click on reset password."
          );
        } else {
          console.log(JSON.stringify(error));
          toast.error("Unexpected error registering, please try later.");
        }
      });
  };

  const login = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, loginEmail, loginPass)
      .then((user) => {
        console.log("User logged in:", loginEmail);
        router.push("/");
      })
      .catch((error) => {
        setLoading(false);
        switch (error.code) {
          case "auth/wrong-password":
            toast.error(
              "Bad email or password, try again or click on reset password."
            );
            break;
          case "auth/user-not-found":
            toast.info("User not registerd yet, please register.");
            toggleForm();
            break;
          default:
            console.log(JSON.stringify(error));
            toast.error("Unexpected error loging in, please try later.");
        }
      });
  };

  const loginWithMainMethodForUser = async (email) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (!signInMethods) return;
      let existingLoginProvider;
      switch (signInMethods[0]) {
        case "google.com":
          existingLoginProvider = new GoogleAuthProvider();
          break;
        case "twitter.com":
          existingLoginProvider = new TwitterAuthProvider();
          break;
        case "facebook.com":
          existingLoginProvider = new FacebookAuthProvider();
          break;
        case "password":
          toast.info(
            "The email for your third party account is already registered, please enter your password or click on reset password."
          );
          setLoginEmail(email);
          return;
        default:
          toast.error(`Unsupported method alternative: ${signInMethods}`);
          return;
      }
      signInWithPopup(auth, existingLoginProvider)
        .then(router.push("/"))
        .catch((error) => {
          console.log(JSON.stringify(error));
          toast.error("Unexpected error signing in.");
        });
    } catch (error) {
      console.log(JSON.stringify(error));
      toast.error(
        "Unexpected error looking for login methods, please try again later."
      );
      setLoading(false);
    }
  };

  const thirdPartyLogin = async (provider) => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User logged in:", result.user.email);
        router.push("/");
      })
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          loginWithMainMethodForUser(error.customData.email);
        } else {
          toast.error("Unexpected error attempting third party login.");
          console.log(JSON.stringify(error));
        }
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

      <div className="d-flex flex-column">
        <div className="d-flex justify-content-center my-1">
          <button
            type="button"
            onClick={() => thirdPartyLogin(new GoogleAuthProvider())}
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
        <div className="d-flex justify-content-center my-1">
          <button
            type="button"
            onClick={() => thirdPartyLogin(new TwitterAuthProvider())}
            className="btn btn-info rounded-pill col-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-twitter mx-2"
              viewBox="0 0 16 16"
            >
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg>
            Login with Twitter
          </button>
        </div>
        <div className="d-flex justify-content-center my-1">
          <button
            type="button"
            onClick={() => thirdPartyLogin(new FacebookAuthProvider())}
            className="btn btn-primary rounded-pill col-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-facebook mx-2"
              viewBox="0 0 16 16"
            >
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
            </svg>
            Login with Facebook
          </button>
        </div>
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
            <a className="link-danger">Reset Password</a>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Login;
