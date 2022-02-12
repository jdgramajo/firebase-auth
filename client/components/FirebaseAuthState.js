// Component that keeps track of the current auth state, it wraps _app.js
// allowing the rest of the app to be aware of it.

import React, { useEffect, useContext } from "react";
import { setCookie, destroyCookie } from "nookies";
import { getAuth } from "firebase/auth";

import firebase from "../firebase";
import { Context } from "../context";

const FirebaseAuthState = ({ children }) => {
  const { dispatch } = useContext(Context);
  const auth = getAuth(firebase);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        dispatch({
          type: "LOGOUT",
        });
        destroyCookie(null, "token");
        setCookie(null, "token", "", {});
      } else {
        const { token } = await user.getIdTokenResult();
        // set token to cookie
        destroyCookie(null, "token");
        setCookie(null, "token", token, {});
        const response = await fetch(`${process.env.api}/current-user`, {
          method: "POST",
          headers: {
            token: token,
          },
        });
        if (!response?.ok) throw new Error("Response not ok.");
        const responseJSON = await response.json();
        dispatch({
          type: "LOGIN",
          payload: responseJSON,
        });
      }
    });
  }, []);

  return <>{children}</>;
};

export default FirebaseAuthState;
