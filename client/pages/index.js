import { useContext } from "react";

import { Context } from "../context";

const Home = () => {
  const { state } = useContext(Context);

  return (
    <div className="container mt-4">
      <h2>Home page</h2>
      <p className="lead">
        This page is for public view. Anyone can access it. If you login, you
        can see your details here.
      </p>
      <pre>{JSON.stringify(state, null, 4)}</pre>
    </div>
  );
};

export default Home;
