import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginArgs } from "../api/calendarServer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login, UserState } from "../store/slices/userSlice";
import "./loginStyles.css";

const Login = () => {
  const [inputs, setInputs] = useState<LoginArgs>({ email: "", password: "" });
  const { loading, data, error }: UserState = useAppSelector(
    (state) => state.user
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(inputs));
  };
  useEffect(() => {
    if (data && data.email) {
      navigate("/calendar");
    }
  }, [data]);

  return (
    <div id="login-page">
      {loading && "Loading..."}
      {!loading && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="login-title">Log in to Planner</div>
          <div className="email">
            <span>Email</span>
            <input
              type="email"
              className="form-input"
              name="email"
              required
              onChange={(e) => handleInputs(e)}
            />
          </div>
          <div className="password">
            <span>Password</span>
            <input
              type="password"
              className="form-input"
              name="password"
              required
              onChange={(e) => handleInputs(e)}
            />
          </div>
          <button type="submit" className="submit-btn">
            Log in
          </button>
        </form>
      )}
      <div className="new-user">
        New to PLANNER? <a href="/signup">Create an account. </a>
      </div>
    </div>
  );
};

export default Login;
