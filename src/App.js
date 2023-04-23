import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Header from "./components/Layout/Header";
import Expenses from "./pages/Expenses";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Welcome from "./pages/Welcome";
import './App.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth-slice";
import { fetchExpenseData, sendExpenseData } from "./store/expense-actions";

let initial = true
function App() {
  const {isAuthenticated, email, token} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const expense = useSelector(state => state.expense)
  const changed = useSelector(state => state.expense.changed)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedEmail = localStorage.getItem('email')
    if(savedToken && savedEmail){
      dispatch(authActions.login({token: savedToken, email: savedEmail}))
    }
  }, [dispatch])
  useEffect(() => {
    if(isAuthenticated) {
      localStorage.setItem('token', token)
      localStorage.setItem('email', email)
    }else{
      localStorage.removeItem('email')
      localStorage.removeItem('token')
    }
  }, [token, email, isAuthenticated])
  useEffect(() => {
    if(isAuthenticated) {
      dispatch(fetchExpenseData(email))
    }
  }, [dispatch, email, isAuthenticated])

  useEffect(() => {
    if(initial){
      initial = false
      return 
    }
    if(expense.changed){
      dispatch(sendExpenseData(expense, email))
    }
  }, [expense, dispatch, email, changed])
  return (
    <Fragment>
    <Header />
    {!isAuthenticated && <Login />}
      <Switch>
        <Route path="/home" exact>
          {isAuthenticated && <Welcome/>}
        </Route>
        {isAuthenticated && <Route path='/expenses'>
          <Expenses/>
        </Route>}
        {isAuthenticated && <Route path="/profile">
          <Profile />
        </Route>}
        <Route path="/forgot">
          <ForgotPassword/>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
