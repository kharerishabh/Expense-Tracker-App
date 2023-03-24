import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Header from "./components/Layout/Header";
import Welcome from "./pages/Welcome";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Header />
          {!authCtx.isLoggedIn && <Login />}
        </Route>
        {authCtx.isLoggedIn && <Route path='/welcome'>
          <Welcome/>
        </Route>}
      </Switch>
    </>
  );
}

export default App;
