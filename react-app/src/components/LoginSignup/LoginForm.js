import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { login } from "../../store/session";

function LoginForm() {
  console.log("go in login form");
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const user = useSelector((state) => state.session.user);

  if (user) history.push("/");

  const getEmail = (e) => setEmail(e.target.value);
  const getPassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);
    return dispatch(login(email, password)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    // <div>Testing</div>
    <div className="flex-column login-form">
      <div className="x"></div>
      <div className="login-header flex s-b center">
        <div className="mlr-16">
          <h1 className="h1-inherit">Log in</h1>
        </div>
      </div>
      <div className="p-24 login-body">
        <div>
          <div className="mtb-8-24">
            <h3 className="mb-8">Welcome to Calibnb</h3>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={email}
              onChange={getEmail}
              required
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={getPassword}
              required
              placeholder="Password"
            />
            {errors.length > 0 && (
              <ul className="error-messages">
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            )}
            <div className="mtb-16-24">
              <button className="p-14-24" type="submit">
                <span>Login</span>
              </button>
            </div>
            <div className="mtb-16-24">
              <button
                className="p-14-24"
                type="submit"
                onClick={() => {
                  setEmail("demo4@aa.io");
                  setPassword("password");
                }}
              >
                <span>demouser1</span>
              </button>
            </div>
            <div className="mtb-16-24">
              <button
                className="p-14-24"
                type="submit"
                onClick={() => {
                  setEmail("demo1@aa.io");
                  setPassword("password");
                }}
              >
                <span>demohost1</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
