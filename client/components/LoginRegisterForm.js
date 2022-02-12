import React from "react";

const LoginRegisterForm = ({
  email,
  setEmail,
  pass,
  setPass,
  buttonName,
  handleSubmit,
  toggleForm,
  toggleText,
}) => (
  <div className="col-md-6">
    <div className="form-group my-1">
      <label>Email</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="form-control"
        placeholder="email"
      />
      <small>We'll never share your email</small>
    </div>

    <div className="form-group my-1">
      <label>Password</label>
      <input
        type="password"
        onChange={(e) => setPass(e.target.value)}
        value={pass}
        className="form-control"
        placeholder="password"
      />
    </div>

    <div className="d-flex justify-content-evenly my-4">
      <button onClick={handleSubmit} className="btn btn-primary">
        {buttonName}
      </button>
      <div onClick={toggleForm}>
        <a className="link-primary" href="#">
          {toggleText}
        </a>
      </div>
    </div>
  </div>
);

export default LoginRegisterForm;
