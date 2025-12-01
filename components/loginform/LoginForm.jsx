import React, { useState } from "react";
import "./loginform.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../redux/reducers/auth/auth.thunks";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(getToken({ name, password }, navigate));
  };
  return (
    <form className="znect__loginform" onSubmit={handleSubmit}>
      <div className="znect__loginform_user">
        <input
          type="text"
          id="username"
          required
          placeholder="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="znect__loginform_pass">
        <input
          type="password"
          id="password"
          required
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
