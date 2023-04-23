// import { useContext } from 'react';
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth-slice';
const Header = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const logoutHandler = () => {
    dispatch(authActions.logout())
  }
  return (
    <>
    {/* <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Expense Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link to="/home">Home</Nav.Link>
            <Link to="/profile">Products</Link>
            <Link >About Us</Link>
          </Nav>
        </Container> 
       </Navbar> */}

      <nav className="navbar navbar-expand-lg bg-light variant-dark">
        <div className="collapse navbar-collapse justify-content-between">
          <h2 className="bg-light">Expense Tracker</h2>
          <ul className="navbar-nav mx-auto p-2 ">
            <li className="nav-item bg-light "><Link to="/home">Home</Link></li>
            <li className='nnav-item bg-light '><Link to='/expenses'>Expenses</Link></li>
          </ul>
           {isAuth &&<Button onClick={logoutHandler}>
            Logout
          </Button>}
        </div>
      </nav>
      <hr/>
    </>
  );
};
export default Header;
