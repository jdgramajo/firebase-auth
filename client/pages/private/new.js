import { parseCookies } from "nookies";

const PrivateContent = () => {
  return (
    <div className="container mt-4">
      <h2>Private content from private endpoint in the backend.</h2>
      <p className="lead">This is a protected page for logged in users only.</p>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const cookies = parseCookies(context);
    const response = await fetch(`${process.env.api}/private-route`, {
      method: "GET",
      headers: {
        token: cookies.token,
      },
    });
    if (!response?.ok) throw new Error("Response not ok.");
    return { props: {} };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
};

export default PrivateContent;
