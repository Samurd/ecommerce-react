import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { CartSideBar } from './CartSideBar';
import { useState, useEffect } from 'react';

function AppNavbar() {

  const navigate = useNavigate()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    const token = localStorage.getItem("tokenUser");

    if(token) {
      setShow(true)
    } else {
      navigate("/login")
    }
  };

  return (
    <>
    <Navbar className='bg-light'>
      <Container>
        <Navbar.Brand as={Link} to='/'>Ecommerce App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/purchases">Purchases</Nav.Link>
            <Nav.Link onClick={handleShow}>Cart</Nav.Link>
            <CartSideBar show={show} handleClose={handleClose} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </>
  );
}

export default AppNavbar;