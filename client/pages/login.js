import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "antd";
import { GoogleOutlined, SyncOutlined } from "@ant-design/icons";
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
  const [loginEmail, setLoginEmail] = useState("jdgramajo@gmail.com");
  const [loginPass, setLoginPass] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPass, setRegisterPass] = useState("");
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="container">
      <h2 className="text-center pt-4 display-4">
        {loading ? (
          <SyncOutlined spin className="text-danger" />
        ) : (
          "Login / Register"
        )}
      </h2>

      <Button
        onClick={googleLogin}
        type="primary"
        danger
        shape="round"
        icon={<GoogleOutlined />}
        size="large"
        block
      >
        Login with Google
      </Button>

      <div className="row">
        <LoginRegisterForm
          email={loginEmail}
          setEmail={setLoginEmail}
          pass={loginPass}
          setPass={setLoginPass}
          handleSubmit={login}
          buttonName="Login"
        />

        <LoginRegisterForm
          email={registerEmail}
          setEmail={setRegisterEmail}
          pass={registerPass}
          setPass={setRegisterPass}
          handleSubmit={register}
          buttonName="Register"
        />
      </div>

      <div className="d-flex">
        <Link href="/reset-password">
          <a className="btn btn-outline-danger btn-sm mt-5">Reset Password</a>
        </Link>
      </div>
    </div>
  );
};

export default Login;
