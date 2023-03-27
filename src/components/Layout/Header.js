import { useContext } from 'react';
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
const Header = () => {
  const authCtx = useContext(AuthContext)
  const logoutHandler = () => {
    authCtx.logout()
  }
  return (
    <>
    {/* <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Expense Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/profile">Products</NavLink>
            <NavLink >About Us</NavLink>
          </Nav>
        </Container> */}
      {/* </Navbar> */}

      <nav className="navbar navbar-expand-lg bg-light variant-dark">
        <div className="collapse navbar-collapse justify-content-between">
          <h2 className="bg-light">Expense Tracker</h2>
          <ul className="navbar-nav mx-auto p-2 ">
            <li className="nav-item bg-light "><Link to="/home">Home</Link></li>
            <li className='nnav-item bg-light '><Link to='/expenses'>Expenses</Link></li>
            <li className="nav-item bg-light">Products</li>
            <li className="nav-item bg-light" >About Us</li>
          </ul>
           {authCtx.isLoggedIn &&<Button onClick={logoutHandler}>
            Logout
          </Button>}
        </div>
      </nav>
      <hr/>
    </>
  );
};
export default Header;
