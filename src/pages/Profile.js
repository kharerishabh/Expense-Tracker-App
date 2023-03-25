import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import classes from "./Profile.module.css";

const Profile = () => {
  const history = useHistory();
  const nameInputRef = useRef();
  const photoInputRef = useRef();
  console.log(localStorage.getItem("token"))
  const submitHandler = async (event) => {
    event.preventDefault()
    console.log("Submit");
    const enteredName = nameInputRef.current.value;
    const enteredPhotoUrl = photoInputRef.current.value;
    const idToken = localStorage.getItem("token")
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAeVuAP3AC60M5s9NgCzw8jFbPj8zKgv_E",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: idToken,
            displayName: enteredName,
            photoUrl: enteredPhotoUrl,
            returnSecureToken: true
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if(res.ok){
        alert("Date Updated Successfully")
        history.replace('/home')
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <>
      <h4>Winner Never Quite, Quitter Never Win</h4>
      <p style={{ textAlign: "right" }}>
        Your Profile is 64% complete, A complete profile has higher chances to
        land a job <Link to="/profile">Complete now</Link>
      </p>
      <hr />
      <section className={classes.profile}>
        <form onSubmit={submitHandler}>
          <h4>Contact Detail</h4>
          <div className={classes.control}>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" required ref={nameInputRef} />
            <label htmlFor="url">Profile Photo Url</label>
            <input type="url" id="photourl" required ref={photoInputRef} />
          </div>
          <div>
            <Button className={classes.toggle} type="submit">Update</Button>
          </div>
        </form>
      </section>
    </>
  );
};
export default Profile;
