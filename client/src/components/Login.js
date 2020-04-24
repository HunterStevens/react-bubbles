import React, {useState} from "react";
import AxiosAuth from '../Utils/AxiosAuth';
import {useParams, useHistory} from 'react-router-dom';



const Login = () => {
  const history = useHistory();

  const initialState = {
  username:"",
  password:""
}
  const [loginState, setLoginState] = useState(initialState);

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

    AxiosAuth().post('')
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
          type="text"
          name="password"
          value={loginState.password}
          onChange={handleChange}
          placeholder="Password"
          />
        </label>
      </form>
    </>
  );
};

export default Login;
