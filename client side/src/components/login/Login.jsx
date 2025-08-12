import React, { useState } from 'react';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toastAlert } from '../../utils/toastAlert';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const loginHandler = async () => {
    if (!email || !password) {
      return toastAlert({
        type: "error",
        message: "Missing Fields!"
      });
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, {
        email,
        password
      });

      const token = res.data?.data?.token || res.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", res.data.userData._id);
        toastAlert({
          type: "success",
          message: res.data.successRes?.message || "Logged in successfully!"
        });
        navigate("/");
      } else {
        toastAlert({
          type: "error",
          message: "Token not found in response!"
        });
      }

    } catch (error) {
      toastAlert({
        type: "error",
        message: error.response?.data?.message || "Login failed"
      });
    }
  };

  return (
    <div className='loginPage'>
      <div className="loginBox">
        <h2>Login</h2>

        <div className="email">
          <div>Email</div>
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="password">
          <div>Password</div>
          <div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? '/img/showIcon.png' : '/img/hideIcon.png'}
              alt="toggle"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        <button onClick={loginHandler}>Login</button>

        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
