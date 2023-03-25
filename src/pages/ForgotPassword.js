import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const history = useHistory()
  const emailInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false)

  const forgotPasswordHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAeVuAP3AC60M5s9NgCzw8jFbPj8zKgv_E",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmail,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json()
      console.log(data)
      if(res.ok) {
        setIsLoading(true)
        alert('Password Reset Link is sent, please check your mail')
        history.replace('/home')
      }else{
        alert('Entered Email is not Correct')
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <section className={classes.auth}>
      <h5>Forgot Password</h5>
      <div className={classes.control}>
        <label htmlFor="email">Enter Valid Email</label>
        <input type="email" id="email" required ref={emailInputRef} />
      </div>
      <div className={classes.actions}>
      {!isLoading && (<button type="button" onClick={forgotPasswordHandler}>
        Submit
      </button>)}
      {isLoading && <p>Sending Email...</p>}
      </div>
    </section>
  );
};
export default ForgotPassword;
