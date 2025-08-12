import React, { useState } from 'react';
import './signup.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toastAlert } from '../../utils/toastAlert';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const navigate = useNavigate();

  const signupHandler = async () => {
    // Field validations
    if (!userName || !email || !password) {
      return toastAlert({
        type: 'error',
        message: 'All fields are required!',
      });
    }

    if (!email.endsWith('@gmail.com')) {
      return toastAlert({
        type: 'error',
        message: 'Please enter a valid Gmail address!',
      });
    }

    if (password.length < 8) {
      return toastAlert({
        type: 'error',
        message: 'Password must be at least 8 characters!',
      });
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/register`, {
        username: userName,
        email,
        password,
      });

      toastAlert({
        type: 'success',
        message: res.data.message || 'Signup successful!',
      });

              navigate('/');

    } catch (error) {
      toastAlert({
        type: 'error',
        message: error?.response?.data?.message || 'Signup failed!',
      });
    }
  };

  return (
    <div className='signup'>
      <div className='container'>
        {/* Username */}
        <div className='userName'>
          <span>User Name</span>
          <input
            type='text'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder='User Name'
          />
        </div>

        {/* Email */}
        <div className='email'>
          <span>Email</span>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
        </div>

        {/* Password */}
        <div className='password'>
          <span>Password</span>
          <div>
            <input
              type={isPasswordHidden ? 'password' : 'text'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
            />
            <div className='passwordToggle'>
              {isPasswordHidden ? (
                <img
                  src='/img/hideIcon.png'
                  onClick={() => setIsPasswordHidden(false)}
                  height='40px'
                  alt='Hide'
                />
              ) : (
                <img
                  src='/img/showIcon.png'
                  onClick={() => setIsPasswordHidden(true)}
                  height='35px'
                  alt='Show'
                />
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className='btnCon' style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px"
        }} >
          <button onClick={signupHandler} style={{
            width: "100%"
          }} >Signup</button>
          <span>
            Already have an account? <Link to='/'>Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
