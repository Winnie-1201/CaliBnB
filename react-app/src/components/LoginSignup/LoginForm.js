import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { login } from "../../store/session";
import "./LoginForm.css";

function LoginForm({ setLoginModal }) {
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
    setLoginModal(false);
    return dispatch(login(email, password)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
      else {
        history.push("/");
      }
    });
  };

  return (
    // <div>Testing</div>
    <div className="flex-column login-form">
      <div className="x"></div>
      <div className="login-header flex s-b center">
        <div className="header-left"></div>
        <div className="mlr-16">
          <h1 className="h1-inherit">Log in</h1>
        </div>
        <div className="header-right"></div>
      </div>
      <div className="p-24 login-body">
        <div className="mtb-8-24">
          <h3 className="mb-8">Welcome to Calibnb</h3>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="mt-16">
            <div className="br relative">
              <div className="flex input-box">
                <input
                  className="input-text"
                  type="text"
                  value={email}
                  onChange={getEmail}
                  required
                  placeholder="Email"
                />
              </div>
              <div className="flex input-box">
                <input
                  className="input-text"
                  type="password"
                  value={password}
                  onChange={getPassword}
                  required
                  placeholder="Password"
                />
              </div>
            </div>
          </div>
          {errors.length > 0 && (
            <ul className="error-messages">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          )}
          <div className="mtb-16-24">
            <button className="p-14-24" type="submit">
              <span>Log in</span>
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
              <span>Demo User</span>
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
              <span>Demo Host</span>
            </button>
          </div>
        </form>
        <div className="mtb-16">
          <div className="flex center mtb-16 or">or</div>
        </div>
        <div className="mtb-16-24">
          <button className="p-14-24" type="submit">
            <span>Sign up No Function Yet</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
