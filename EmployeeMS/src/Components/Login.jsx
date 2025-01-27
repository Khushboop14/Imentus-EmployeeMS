import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import {Dashboard} from './Dashboard';

const Login = () => {
  // Manage email and password state
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  //to store error
  const [error,setError] = useState(null)
  const navigate = useNavigate()

  // to store the cookie
  axios.defaults.withCredentials = true;
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted Values:', values);
    // Add your API call logic here
    axios
    .post('http://localhost:3000/auth/adminlogin', values)
    .then(result => {
      if(result.data.loginStatus){
        navigate('/dashboard')
      } else{
        setError(result.data.Error)
      }
    })
    
    .catch((err) => console.log('Login Failed:', err));
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 login">
      <div className="p-3 rounded w-25 border loginForm">
        <div className='text-danger'>
          {error && error}
        </div>
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email:</strong></label>
            <input
              type="email"
              name="email"
              id = "email"
              autoComplete="off"
              placeholder="Enter Email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password:</strong></label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              className="form-control rounded-0"
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
