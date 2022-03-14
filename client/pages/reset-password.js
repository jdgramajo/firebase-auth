import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { Context } from "../context";
import firebase from "../firebase";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    state: { user },
  } = useContext(Context);

  let router = useRouter();

  useEffect(() => {
    if (user !== null) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth(firebase);

    await sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.info("Check your email a for password reset link");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      <h2>Reset Password</h2>
      <p className="lead">
        If you have already registered, you can enter your email address to
        receive a password reset link
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email"
          autoFocus
        />
        <br />
        <button className="btn btn-primary" disabled={!email || loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
