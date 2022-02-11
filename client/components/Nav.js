import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";

import firebase from "../firebase";
import { Context } from "../context";

const Nav = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  const router = useRouter();

  const handleLogout = async () => {
    const auth = getAuth(firebase);
    await signOut(auth);
    dispatch({
      type: "LOGOUT",
    });
    router.push("/login");
  };

  return (
    <ul className="nav bg-light d-flex justify-content-start">
      <li className="nav-item">
        <Link href="/">
          <a className="nav-link">Home</a>
        </Link>
      </li>
      {user ? (
        <>
          <li className="nav-item">
            <a className="nav-link" onClick={handleLogout} href="#">
              Logout
            </a>
          </li>
          <li className="nav-item">
            <Link href={user ? "/private/new" : "/login"}>
              <a className="nav-link">Private Content</a>
            </Link>
          </li>
        </>
      ) : (
        <li className="nav-item">
          <Link href="/login">
            <a className="nav-link">Login</a>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Nav;
