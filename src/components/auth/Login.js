import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./Login.module.css";
import {Link} from 'react-router-dom'

const Login = () => {
  const history = useHistory()
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const conPasswordInputRef = useRef("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConPassword = conPasswordInputRef.current.value;
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAeVuAP3AC60M5s9NgCzw8jFbPj8zKgv_E";
      console.log('User has successfully Login')
      } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAeVuAP3AC60M5s9NgCzw8jFbPj8zKgv_E";
      console.log("User has successfully signed up");
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        conpassword: enteredConPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          let errorMessage = "Authentication failed";
          // if(data && data.error && data.error.message){
          //   errorMessage = data.error.message
          // }
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        history.replace('/home')
        console.log(data.idToken);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "SignUp"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            id="conpassword"
            required
            ref={conPasswordInputRef}
          />
        </div>
        <Link to="/forgot">Forgot Password?</Link>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};
export default Login;
