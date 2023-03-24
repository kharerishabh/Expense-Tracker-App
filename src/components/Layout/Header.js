import { useContext } from 'react';
import {Button} from 'react-bootstrap'
import AuthContext from '../../store/auth-context';
const Header = () => {
  const authCtx = useContext(AuthContext)
  const logoutHandler = () => {
    authCtx.logout()
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="collapse navbar-collapse justify-content-between">
          <h2 className="bg-light">Expense Tracker</h2>
          <ul className="navbar-nav mx-auto ">
            <li className="nav-item bg-light">Home</li>
            <li className="nav-item bg-light">Products</li>
            <li className="nav-item bg-light" >About Us</li>
          </ul>
           {authCtx.isLoggedIn &&<Button onClick={logoutHandler}>
            Logout
          </Button>}
        </div>
      </nav>
    </>
  );
};
export default Header;
