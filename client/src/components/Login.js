import React, {useState} from "react";
import AxiosAuth from '../Utils/AxiosAuth';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios'



const Login = () => {
  const history = useHistory();

  const [loginState, setLoginState] = useState({
    username:'',
    password:''
  });

  const handleChange = ev =>{
    setLoginState({
      ...loginState,
      [ev.target.name]:ev.target.value
    })
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const loginSubmit = ev =>{
    ev.preventDefault();

    axios.post('http://localhost:5000/api/login', loginState)
    .then(res =>{console.log("Login Fetch: ",res);

    localStorage.setItem('token', res.data.payload);
    history.push('/bubble-page');
    })
    .catch(err => console.log("Login ERROR: ",err))
  }
  
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={loginSubmit}>
        <label htmlFor="username">
          <input label="username"
          type="text"
          name="username"
          value={loginState.username}
          onChange={handleChange}
          placeholder="username"
          />
        </label>

        <label htmlFor="password">
          <input label="password"
          type="password"
          name="password"
          value={loginState.password}
          onChange={handleChange}
          placeholder="Password"
          />
        </label>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
