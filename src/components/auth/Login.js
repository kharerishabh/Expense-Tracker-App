import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const conPasswordInputRef = useRef("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin(prev => !prev)
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConPassword = conPasswordInputRef.current.value;
    if (!isLogin) {
      if (enteredPassword !== enteredConPassword) {
        return alert("Password and the confirm password is not same");
      }
    }
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAeVuAP3AC60M5s9NgCzw8jFbPj8zKgv_E";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAeVuAP3AC60M5s9NgCzw8jFbPj8zKgv_E";
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
         setIsLogin(true);
        const data = await res.json();
        const userEmailId = data.email;
        const replaceEmailId = userEmailId.replace("@", "").replace(".", "");
        dispatch(authActions.login({email: replaceEmailId, token: data.idToken}))
        localStorage.setItem("email", replaceEmailId);
        localStorage.setItem('token', data.idToken)
        console.log(replaceEmailId);
        console.log(data.idToken);
        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";

        if (!isLogin) {
          conPasswordInputRef.current.value = "";
          alert("Signup successful");
          history.replace("/home");
        } else {
          alert("Login Successful");
          history.replace("/home");
        }
      } else {
        setIsLoading(false)
        const data = await res.json();
        throw data.error;
      }
    } catch (err) {
      console.log(err.message);
    }
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
