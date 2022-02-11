import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";

import FirebaseAuthState from "../components/FirebaseAuthState";
import { Provider } from "../context";
import Nav from "../components/Nav";

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <FirebaseAuthState>
        <Nav />
        <ToastContainer />
        <Component {...pageProps} />
      </FirebaseAuthState>
    </Provider>
  );
}
