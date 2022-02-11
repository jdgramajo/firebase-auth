import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

import FirebaseAuthState from "../components/FirebaseAuthState";
import { Provider } from "../context";
import Nav from "../components/Nav";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider>
      <FirebaseAuthState>
        <Nav />
        <ToastContainer />
        <Component {...pageProps} />
      </FirebaseAuthState>
    </Provider>
  );
};

export default MyApp;
