import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Header from "./components/Layout/Header";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Welcome from "./pages/Welcome";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
    <Header />
      <Switch>
        <Route path="/home" exact>
          {authCtx.isLoggedIn && <Welcome/>}
          {!authCtx.isLoggedIn && <Login />}
        </Route>
        {authCtx.isLoggedIn && <Route path="/profile">
          <Profile />
        </Route>}
        <Route path="/forgot">
          <ForgotPassword/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
