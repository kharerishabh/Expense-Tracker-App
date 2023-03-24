import React, {useContext} from 'react';
import Login from './components/auth/Login';
import Header from './components/Header/Header';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext)
  return (<>
    <Header/>
    {!authCtx.isLoggedIn && <Login/>}
    </>
  );
}

export default App;
