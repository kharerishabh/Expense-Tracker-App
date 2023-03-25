import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  const styling = {
    textAlign: 'right',
    // padding: '2rem',
    margin: '1rem auto'
  }
  return (
    <div>
      <h3>Welcome to the Expense Tracker!!!</h3>
      <p style={styling}>Your Profile is Incomplete <Link to="/profile">Complete Now</Link></p><hr/>
    </div>
  );
};
export default Welcome;
