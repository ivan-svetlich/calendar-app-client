import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginArgs, SignupArgs } from "../../api/calendarServer";
import useSignup from "../../hooks/useSignup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearMessage, setMessage } from "../../store/slices/messageSlice";
import "./signupStyles.css";

const Signup = () => {
  const [inputs, setInputs] = useState<SignupArgs>({
    username: "",
    email: "",
    password: "",
  });
  const [signupState, signup] = useSignup();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    const value = e.target.value;
    setInputs((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(inputs);
  };
  useEffect(() => {
    if (signupState.data && signupState.data.email) {
      navigate("/login");
    }
  }, [signupState]);

  useEffect(() => {
    dispatch(clearMessage());
  }, []);

  return (
    <div id="signup-page">
      {signupState.loading && "Loading..."}
      {!signupState.loading && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="signup-title">Create an account</div>
          <div className="email">
            <span>Username</span>
            <input
              type="text"
              className="form-input"
              name="username"
              required
              onChange={(e) => handleInputs(e)}
            />
          </div>
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
            Sign up
          </button>
        </form>
      )}
      <div className="new-user">
        Already have an account? <Link to="/login">Log in. </Link>
      </div>
    </div>
  );
};

export default Signup;
