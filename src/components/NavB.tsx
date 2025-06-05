import { NavLink, useNavigate } from 'react-router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { use } from 'react';
import { useAuth } from './auth/AuthProvider';
function NavB() {
  const { isAuthenticated } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleOnClick = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/signin")

  };
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            {isAuthenticated ? (
              <><Nav.Link as={NavLink} to="/">Home</Nav.Link ><Nav.Link as={NavLink} to="/item">Item</Nav.Link><Nav.Link as={NavLink} to="/user">User</Nav.Link><Nav.Link as={NavLink} to="/request">Requset</Nav.Link><Button variant="warning" onClick={handleOnClick}>Logout </Button></>
            ) : (
              <><Nav.Link as={NavLink} to="/">Home</Nav.Link><Nav.Link as={NavLink} to="/signin">SignIn</Nav.Link><Nav.Link as={NavLink} to="/signup">SignUp</Nav.Link></>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavB;